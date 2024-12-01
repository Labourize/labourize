## Generate Keys:

```sh
openssl genrsa -out jwt-private.key 2048
openssl rsa -in jwt-private.key -pubout -out jwt-public.key
```
