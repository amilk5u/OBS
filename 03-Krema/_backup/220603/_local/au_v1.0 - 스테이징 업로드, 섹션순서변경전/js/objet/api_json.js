const data = {
   "info": {
      "_postman_id": "37b4dc1e-ba3b-419b-918e-89ee5c15ac71",
      "name": "Integrate ObjetSales",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
   },
   "item": [
      {
         "name": "Add ObjetSales To Cart Staging",
         "request": {
            "method": "POST",
            "header": [
               {
                  "key": "Store",
                  "value": "au",
                  "type": "text"
               }
            ],
            "body": {
               "mode": "raw",
               "raw": 'map',
               "options": {
                  "raw": {
                     "language": "json"
                  }
               }
            },
            "url": {
               "raw": "https://stg.obs.lg.com/au/graphql",
               "protocol": "https",
               "host": [
                  "stg",
                  "obs",
                  "lg",
                  "com"
               ],
               "path": [
                  "au",
                  "graphql"
               ]
            }
         },
         "response": []
      }
   ]
}

mutation: {
   addObjetSalesToCart(
      input: {
      cartItems: [
         {
            data: { sku: "MD07545595", qty: 1 },
            zipcode: "2000"
         },
         {
            data: { sku: "MD07553574", qty: 1 },
            zipcode: "2000",
            lg_custom_options: {
               objet_sales_options: "AGF30133425, top, green, glass",
               parent_sku: "MD07545595"
            }
         },
         {
            data: { sku: "MD07553654", qty: 1 },
            zipcode: "2000"
         },
         {
            data: { sku: "MD07553575", qty: 1 },
            zipcode: "2000",
            lg_custom_options: {
               objet_sales_options: "AGF30133425, top, green, glass",
               parent_sku: "MD07553654"
            }
         }
      ]
   }
   )
}


{

   "query": "mutation { addObjetSalesToCart( input: { cartItems: [ { data: { sku: "MD07545595", qty: 1 }, zipcode: "2000" }, { data: { sku: "MD07553574", qty: 1 }, zipcode: "2000" lg_custom_options: { objet_sales_options: "AGF30133425, top, green, glass" parent_sku: "MD07545595" } }, { data: { sku: "MD07553654", qty: 1 }, zipcode: "2000" }, { data: { sku: "MD07553575", qty: 1 }, zipcode: "2000" lg_custom_options: { objet_sales_options: "AGF30133425, top, green, glass" parent_sku: "MD07553654" } } ] } ) { redirectUrl cart { items { product { sku } qty } } } }",

      "variables": null,

         "operationName": null

}