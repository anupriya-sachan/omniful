
export const formDatajson = [{
    step:"Customer Info",
    fields:[
        {name:"cName",label:"Customer Name",type:"text"},
        {name:"customerEmail",label:"Customer Email",type:"email"},
        {name:"customerPhone",label:"Customer Phone",type:"tel"},
        {name:"orderDate",label:"Order Date",type:"date"},
        {name:"deliveryDate",label:"Delivery Date",type:"date"},
    ]},
   {
  step: "Address",
  fields: [
        {
            name: "shippingAddress.line1",
            label: "Shipping Address Line 1",
            type: "text",
        },
        {
            name: "shippingAddress.line2",
            label: "Shipping Address Line 2",
            type: "text",
        },
        {
            name: "shippingAddress.city",
            label: "City",
            type: "text",
        },
        {
            name: "shippingAddress.state",
            label: "State",
            type: "text",
        },
        {
            name: "shippingAddress.pincode",
            label: "Pincode",
            type: "text",
        },

        {
            name: "billingAddress.line1",
            label: "Billing Address Line 1",
            type: "text",
        },
        {
            name: "billingAddress.line2",
            label: "Billing Address Line 2",
            type: "text",
        },
        {
            name: "billingAddress.city",
            label: "City",
            type: "text",
        },
        {
            name: "billingAddress.state",
            label: "State",
            type: "text",
        },
        {
            name: "billingAddress.pincode",
            label: "Pincode",
            type: "text",
        }],
    },
    {
        step: "Products",
        isRepeatable: true, 
        fields: [
            {
            name: "productId",
            label: "Select Product",
            type: "select", 
            source: "products",
            optionLabelKey: "name",    
            optionValueKey: "id",      
            },
            {
            name: "quantity",
            label: "Quantity",
            type: "number"
            },
            {
            name: "price",
            label: "Price",
            type: "number",
            readOnly: true 
            },
            {
            name: "name",
            label: "Product Name",
            type: "text",
            readOnly: true
        }],
    },
    {
        step: "Additional Info",
        fields: [
        { name: "repName", label: "Sales Rep", type: "text" },
        {
            name: "status",
            label: "Status",
            type: "select",
            options: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        },
        { name: "notes", label: "Notes", type: "textarea" },
        { name: "documents", label: "Upload Documents", type: "file"},
    ],
  },
  {
    step: "Review",
    fields: [], 
    }
]

