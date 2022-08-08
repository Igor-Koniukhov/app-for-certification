include ./neardev/dev-account.env
include .env

near-dev-deploy:
	near dev-deploy -f && npm start

contract-init:
	near call $(ACCOUNT) new_default_meta'{"owner_id": '$(ACCOUNT)'}' --accountId $(ACCOUNT)

contract-deploy:
	near deploy --wasmFile "out/main.wasm" --accountId $(CONTRACT_NAME)


