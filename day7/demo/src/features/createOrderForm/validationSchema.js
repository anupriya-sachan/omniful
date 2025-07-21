import * as yup from 'yup';

const productSchema = yup.object().shape({
  productId: yup.string().required('Product ID is required'),
  name: yup.string().required('Product name is required'),
  quantity: yup
    .number()
    .typeError('Quantity must be a number')
    .positive('Quantity must be greater than zero')
    .required('Quantity is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .min(0, 'Price cannot be negative')
    .required('Price is required'),
});

const imageSchema = yup
  .mixed()
  .required('Image is required')
  .test('fileType', 'Only image files are allowed', (file) =>
    file ? ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type) : false
  )
  .test('fileSize', 'File too large (max 2MB)', (file) =>
    file ? file.size <= 2 * 1024 * 1024 : false
  );


export const yupStepSchema = [
    yup.object({
        cName:yup.string().required(),
        customerEmail:yup.string().email("Not valid email").required(),
        customerPhone:yup.string().matches(/(\+91\ )[6-9]{1}[0-9 ]{3}[0-9 ]{3}[0-9]{3}/, {
            message: "Invalid Indian number",
            excludeEmptyString: false,
        }).required(),
        orderDate:yup.date().required("Order date is required"),
        deliveryDate:yup.date().required("Order date is required"),
    }),
    yup.object({
        shippingAddress:yup.object({
            line1:yup.string().required("Address is required"),
            line2:yup.string(),
            city:yup.string().required("City is required"),
            state:yup.string().required("State is required"),
            pincode:yup.string().matches(/^[1-9][0-9]{5}$/, 'Pincode must be a valid 6-digit number').required('Pincode is required'),
        }),
        billingAddress:yup.object({
            line1:yup.string().required("Address is required"),
            line2:yup.string(),
            city:yup.string().required("City is required"),
            state:yup.string().required("State is required"),
            pincode:yup.string().matches(/^[1-9][0-9]{5}$/, 'Pincode must be a valid 6-digit number').required('Pincode is required'),
        })
    }),
    yup.object({
        products:yup.array().of(productSchema),
    }),
    yup.object({
        repName:yup.string().required(),
        status:yup.string().required(),
        notes:yup.string().default(""),
        documents:yup.array().of(imageSchema),
    }),
    yup.object({
        
    })
]

