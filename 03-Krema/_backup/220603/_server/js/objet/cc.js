  "errors": [    {      "message": "allUsers query failed"    },    {      "message": "user query failed"    }  ]

  {"query":"mutation { addObjetSalesToCart( input: { 
     cartItems: [ 
      { data: { sku: \"MD07545595\", qty: 1 }, zipcode: \"2000\" },
      { data: { sku: \"MD07553647\", qty: 1 }, zipcode: \"2000\", lg_custom_options: { objet_sales_options: \"AGF30133401,top,matte Black,stainless\", parent_sku: \"MD07545595\" } },
      { data: { sku: \"MD07553646\", qty: 1 }, zipcode: \"2000\", lg_custom_options: { objet_sales_options: \"AGF30133403,bottom,matte Black,stainless\", parent_sku: \"MD07545595\" } },
      { data: { sku: \"MD07553646\", qty: 1 }, zipcode: \"2000\", lg_custom_options: { objet_sales_options: \"AGF30133403,bottom,matte Black,stainless\", parent_sku: \"MD07545595\" } }
   ] 
      errors: [  
      { message: 'allUsers query failed' },{message: 'user query failed' } 
   ] 
   }
   ) {redirectUrl cart { items { product { sku } qty } } } }","variables":null,"operationName":null}

{"query":"mutation { addObjetSalesToCart( input: { 
   cartItems: [ 
   { data: { sku: \"MD07545595\", qty: 1 }, zipcode: \"2000\" },
   { data: { sku: \"MD07553647\", qty: 1 }, zipcode: \"2000\", lg_custom_options: { objet_sales_options: \"AGF30133401,top,matte Black,stainless\", parent_sku: \"MD07545595\" } },
   { data: { sku: \"MD07553646\", qty: 1 }, zipcode: \"2000\", lg_custom_options: { objet_sales_options: \"AGF30133403,bottom,matte Black,stainless\", parent_sku: \"MD07545595\" } },
   { data: { sku: \"MD07553646\", qty: 1 }, zipcode: \"2000\", lg_custom_options: { objet_sales_options: \"AGF30133403,bottom,matte Black,stainless\", parent_sku: \"MD07545595\" } }
],
    errors: [  { message: 'allUsers query failed' },{message: 'user query failed' } ] 
}) {redirectUrl cart { items { product { sku } qty } } } }","variables":null,"operationName":null}


{"query":"mutation { addObjetSalesToCart( input: { 
   cartItems: [
    { data: { sku: \"MD07545595\", qty: 1 }, zipcode: \"2000\" },
    { data: { sku: \"MD07553647\", qty: 1 }, zipcode: \"2000\", lg_custom_options: { objet_sales_options: \"AGF30133401,top,matte Black,stainless\", parent_sku: \"MD07545595\" } },
    { data: { sku: \"MD07553646\", qty: 1 }, zipcode: \"2000\", lg_custom_options: { objet_sales_options: \"AGF30133403,bottom,matte Black,stainless\", parent_sku: \"MD07545595\" } },
    { data: { sku: \"MD07553646\", qty: 1 }, zipcode: \"2000\", lg_custom_options: { objet_sales_options: \"AGF30133403,bottom,matte Black,stainless\", parent_sku: \"MD07545595\" } }
   ], 
    errors: [  
      { message: 'allUsers query failed' },{message: 'user query failed' } 
   ] 
}) {redirectUrl cart { items { product { sku } qty } } } }","variables":null,"operationName":null}