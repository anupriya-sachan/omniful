import { useState, useEffect } from "react";
import { useForm, FormProvider, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { yupStepSchema } from "./validationSchema";
import { formDatajson } from "./form";
import { useProducts } from "../../hook/useProducts";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { setNewOrder } from "./orderSlice";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { addLog } from "../audits/auditSlice";


export default function MultiStepForm({isEditable}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state)=>state.auth);

    const { orderId } = useParams();

    const isEditMode = Boolean(orderId);

    const existingOrder = useSelector((state) =>
        state.orders.find((o) => o.orderId === orderId)
    ); 
  
    const [stepIndex, setStepIndex] = useState(() => {
    if (isEditMode) return 0;
    const savedStep = localStorage.getItem("multiStepStepIndex");
    return savedStep ? Number(savedStep) : 0;
    });

    const savedForm = !isEditMode
    ? JSON.parse(localStorage.getItem("multiStepForm") || "{}")
    : null;  

    const { data: productOptions = [], isLoading: productsLoading } = useProducts();


    const methods = useForm({
    resolver: yupResolver(yupStepSchema[stepIndex]),
    defaultValues: {
    shippingAddress: {},
    billingAddress: {},
    products: [{ productId: "", name: "", quantity: "", price: "" }],
    billingSameAsShipping: false, 
    ...(savedForm?.data || {}),
    ...(isEditMode && existingOrder),
    },
    });  

    useEffect(() => {
    if (!isEditMode) {
    const subscription = methods.watch((value) => {
        localStorage.setItem("multiStepForm", JSON.stringify({ data: value }));
    });
    return () => subscription.unsubscribe();
    }
    }, [methods, isEditMode]);

    useEffect(() => {
    if (!isEditMode) {
    localStorage.setItem("multiStepStepIndex", stepIndex.toString());
    }
    }, [stepIndex, isEditMode]);

    const { control, handleSubmit, watch, trigger, formState: { errors } } = methods;

    const currentStep = formDatajson[stepIndex];

    const { fields: productFields, append, remove } = useFieldArray({
    control,
    name: "products",
    });

    const billingSameAsShipping = watch("billingSameAsShipping");

    useEffect(() => {
      if (billingSameAsShipping) {
      const shipping = methods.getValues("shippingAddress");
      methods.setValue("billingAddress", shipping);
      }
      }, [billingSameAsShipping, methods]);

    async function onNext() {
      const valid = await trigger(); // validate all fields
      if (valid) {
        setStepIndex((i) => Math.min(i + 1, formDatajson.length - 1));
      } else {
        console.log("Validation failed");
      }
    }


    function onPrevious() {
    setStepIndex((i) => Math.max(i - 1, 0));
    }

    function calculateTotalAmount(products) {
    return products.reduce((total, product) => {
    const qty = Number(product.quantity);
    const price = Number(product.price);
    return total + (qty * price || 0);
    }, 0);
    }


    function onSubmit(data) {
        const orderId = uuidv4();
        const amount = calculateTotalAmount(data.products);

        const finalData = { orderId,amount, ...data };
        dispatch(setNewOrder(finalData));

        if(!isEditMode){
            dispatch(addLog({
                actionType: 'CREATE_ORDER',
                performedBy: user.username,
                details: {
                    orderId: finalData.orderId,
                    customer: finalData.cName,
                }
            }))
        }
        else{
            dispatch(addLog({
                actionType: 'UPDATE_ORDER',
                performedBy: user.username,
                details: {
                    orderId: finalData.orderId,
                }
            }));
        }

        localStorage.removeItem("multiStepForm");
        localStorage.removeItem("multiStepStepIndex");

        methods.reset({
            shippingAddress: {},
            billingAddress: {},
            products: [{ productId: "", name: "", quantity: "", price: "" }],
            billingSameAsShipping: false,
        });

        alert("Form submitted!");
        navigate('/');
    }

    function renderField(field, index) {
    const name = field.name;
    const value = methods.getValues(name);

    if (!isEditable) {
    return (
    <div key={name} className="mb-4">
        <label className="block mb-1 font-medium">{field.label}</label>
        <p className="p-2 bg-gray-100 rounded">{value || '-'}</p>
    </div>
    );
    }

    if (field.type === "select" && field.source === "products") {
    const prefix = `products.${index}`;
    return (
        <div key={name} className="mb-4">
        <label className="block mb-1 font-medium">{field.label}</label>
        <select
            {...methods.register(name)}
            className="border p-2 w-full"
            onChange={(e) => {
            const selected = productOptions.find(p => p.id === e.target.value);
            methods.setValue(`${prefix}productId`, selected?.id || "");
            methods.setValue(`${prefix}name`, selected?.name || "");
            methods.setValue(`${prefix}price`, selected?.price || "");
            }}
            disabled={productsLoading}
        >
            <option value="">Select a product...</option>
            {productOptions.map((prod) => (
            <option key={prod.id} value={prod.id}>
                {prod.name}
            </option>
            ))}
        </select>
        {errors && errors[name] && (
            <p className="text-red-600 text-sm mt-1">{errors[name]?.message}</p>
        )}
        </div>
    );
    }


    if (field.type === "select") {
    return (
    <div key={name} className="mb-4">
        <label className="block mb-1 font-medium">{field.label}</label>
        <select {...methods.register(name)} className="border p-2 w-full">
        <option value="">Select...</option>
        {field.options.map((opt) => (
            <option key={opt} value={opt}>
            {opt}
            </option>
        ))}
        </select>
        {errors.status && (
        <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>
        )}

    </div>
    );
    } else if (field.type === "textarea") {
    return (
    <div key={name} className="mb-4">
        <label className="block mb-1 font-medium">{field.label}</label>
        <textarea {...methods.register(name)} className="border p-2 w-full" />
        {errors && errors[name] && (
        <p className="text-red-600 text-sm mt-1">{errors[name]?.message}</p>
        )}
    </div>
    );
    } else if (field.type === "file") {
    return (
    <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ...rest } }) => (
        <div key={name} className="mb-4">
            <label className="block mb-1 font-medium">{field.label}</label>
            <input
            type="file"
            multiple={false}
            className="border p-2 w-full"
            onChange={(e) => {
                const filesArray = Array.from(e.target.files);
                onChange(filesArray);
            }}
            {...rest}
            />
            {errors && errors[name] && (
            <p className="text-red-600 text-sm mt-1">{errors[name]?.message}</p>
            )}
        </div>
        )}
    />
    );
    } else {
    return (
    <div key={name} className="mb-4">
        <label className="block mb-1 font-medium">{field.label}</label>
        <input
        type={field.type}
        {...methods.register(name)}
        className="border p-2 w-full"
        />
        {errors && errors[name] && (
        <p className="text-red-600 text-sm mt-1">{errors[name]?.message}</p>
        )}
    </div>
    );
    }
    }

    const isReviewStep = currentStep.step === "Review";

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">{currentStep.step}</h2>

        {isReviewStep ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Review Your Details</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
              {JSON.stringify(methods.getValues(), null, 2)}
            </pre>
          </div>
        ) : currentStep.step === "Address" ? (
          <>
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            {currentStep.fields
              .filter(f => f.name.startsWith("shippingAddress"))
              .map(renderField)}
                {isEditable && 
                <div className="mb-4">
                <label className="inline-flex items-center">
                    <input
                    type="checkbox"
                    {...methods.register("billingSameAsShipping")}
                    className="mr-2"
                    />
                    Billing address same as shipping
                </label>
                </div>
            }

            {!billingSameAsShipping && (
              <>
                <h3 className="font-semibold mb-2">Billing Address</h3>
                {currentStep.fields
                  .filter(f => f.name.startsWith("billingAddress"))
                  .map(renderField)}
              </>
            )}
          </>
        ) : currentStep.isRepeatable ? (
          <>
            {productFields.map((item, idx) => (
              <div
                key={item.id}
                className="mb-6 p-4 border rounded-md relative"
              >
                <h3 className="mb-2 font-semibold">Product #{idx + 1}</h3>

                {currentStep.fields.map((field) => {
                  return renderField(
                    { ...field, name: `products[${idx}].${field.name}` },
                    idx
                  );
                })}
                {isEditable && 
                    <button
                    type="button"
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => remove(idx)}
                    >
                    Remove
                    </button>
                }
              </div>
            ))}
            {isEditable && 
            <button
              type="button"
              className="mb-6 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() =>
                append({ productId: "", name: "", quantity: "", price: "" })
              }
            >
              Add Product
            </button>
            }
          </>
        ) : (
          currentStep.fields.map(renderField)
        )}

        <div className="flex justify-between mt-8">
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={onPrevious}
              className="px-6 py-2 border rounded bg-gray-200"
            >
              Previous
            </button>
          )}

          {stepIndex < formDatajson.length - 1 && (
            <button
              type="button"
              onClick={onNext}
              className="px-6 py-2 border rounded bg-blue-600 text-white ml-auto"
            >
              Next
            </button>
          )}

          {stepIndex === formDatajson.length - 1 && (
            isEditable ? (
                <button
                type="submit"
                className="px-6 py-2 border rounded bg-green-600 text-white ml-auto"
                >
                Submit
                </button>
            ) : (
                <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 border rounded bg-green-600 text-white ml-auto"
                >
                Done
                </button>
            )
            )}
        </div>
      </form>
    </FormProvider>
  );
}