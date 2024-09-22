module addrx::eword {
    use std::bcs;
    use std::signer;
    use std::string::{Self, String};
    use aptos_token::token;
    use aptos_token::token::{TokenDataId, TokenId};

    struct ModuleData has key {
        token_data_id: TokenDataId,
    }

    struct TokenIdData has key {
        token_id: TokenId
    }
        
    const ENOT_AUTHORIZED: u64 = 1;

    public entry fun launch_token(source_account: &signer,
            collection_name: String,
            description: String,
            collection_uri: String,
            token_name: String,
            token_uri: String,
            maximum_supply: u64, 
        ) {
        let mutate_setting = vector<bool>[ false, false, false ];
        token::create_collection(source_account, collection_name, description, collection_uri, maximum_supply, mutate_setting);

        let token_data_id = token::create_tokendata(
            source_account,
            collection_name,
            token_name,
            description,
            0,
            token_uri,
            signer::address_of(source_account),
            1,
            0,
            token::create_token_mutability_config(
                &vector<bool>[ false, false, false, false, true ]
            ),
            vector<String>[string::utf8(b"given_to")], // property keys
            vector<vector<u8>>[b""], // property values
            vector<String>[ string::utf8(b"address") ], // property types
        );

        move_to(source_account, ModuleData {
            token_data_id,
        });
    }

    public entry fun mint_event_ticket(module_owner: &signer, receiver: &signer, token_amount: u64) acquires ModuleData {
        assert!(signer::address_of(module_owner) == @addrx, ENOT_AUTHORIZED);

        let module_data = borrow_global_mut<ModuleData>(@addrx);
        let token_id = token::mint_token(module_owner, module_data.token_data_id, token_amount);
        token::direct_transfer(module_owner, receiver, token_id, token_amount);

        let (creator_address, collection, name) = token::get_token_data_id_fields(&module_data.token_data_id);
        token::mutate_token_properties(
            module_owner,
            signer::address_of(receiver),
            creator_address,
            collection,
            name,
            0,
            1,
            vector<String>[string::utf8(b"given_to")],
            vector<vector<u8>>[bcs::to_bytes(&signer::address_of(receiver))],
            vector<String>[ string::utf8(b"address") ],
        );

        move_to(module_owner, TokenIdData {
            token_id,
        })
    }

    public entry fun burn_tokens() {
        // signature: burn(owner: &signer, creators_address: address, collection: string::String, name: string::String, property_version: u64, amount: u64)
        // token::burn()
    }

    #[test_only]
    use std::string::utf8;
    #[test_only]
    use aptos_framework::account;
    #[test_only]
    use std::debug::print;

    #[test(admin = @addrx, receiver = @addrx)]
    fun test_flow(admin: signer, receiver: signer) acquires ModuleData,TokenIdData  {
        let signer_address = signer::address_of(&admin);
        account::create_account_for_test(signer_address);
        
        let collection_name = utf8(b"AOT");
        let description = utf8(b"description");
        let collection_uri = utf8(b"collection_uri");
        let token_name = utf8(b"LEVI");
        let token_uri = utf8(b"token_uri");
        let maximum_supply = 0;

        launch_token(
            &admin,
            collection_name,
            description,
            collection_uri,
            token_name,
            token_uri, 
            maximum_supply
        );

        mint_event_ticket(&admin, &receiver, 12); 

        let token_id_data = borrow_global<TokenIdData>(signer_address);
        let balance = token::balance_of(signer_address, token_id_data.token_id);
        print(&balance);
    }
}