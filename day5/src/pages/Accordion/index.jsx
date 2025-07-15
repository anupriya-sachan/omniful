import Accordion from "./Accordion";
function AccordionPage(){
    return(
        <div>
            <div className='m-auto flex flex-col items-center'>
                <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 border-2 border-gray-200/30 p-3 rounded-full font-medium text-sm my-5">          
                FAQ Section
                </div>
                <h1 className='font-extrabold leading-tight text-2xl'>Frequently Asked Questions</h1>
                <p className='text-gray-500 my-3'>Get answers to all your queries</p>
                <Accordion>
                    <div className='border-2 border-gray-200/30 py-2 px-4 rounded-2xl my-1.5 hover:bg-blue-200/20 hover:shadow-sm'>
                        <Accordion.AccordionItem index={0}>How is Tailwind different from Bootstrap?</Accordion.AccordionItem>
                        <Accordion.AccordionAnswer index={0}> Unlike Bootstrap, which comes with pre-styled components, Tailwind provides low-level utility classes, giving you more control over your design without writing custom CSS.
                        </Accordion.AccordionAnswer>
                    </div>
                    
                    <div className='border-2 border-gray-200/30 py-2 px-4 rounded-2xl my-1.5 hover:bg-blue-200/20  hover:shadow-sm'>
                        <Accordion.AccordionItem index={1}>What is a compound component in React?</Accordion.AccordionItem>
                        <Accordion.AccordionAnswer index={1}>A compound component is a pattern where multiple subcomponents share context and work together as a single, unified feature — like a Tabs or Accordion component.</Accordion.AccordionAnswer>
                    </div>
                    <div className='border-2 border-gray-200/30 py-2 px-4 rounded-2xl my-1.5 hover:bg-blue-200/20  hover:shadow-sm'>
                        <Accordion.AccordionItem index={2}>What is a render prop in React?</Accordion.AccordionItem>
                        <Accordion.AccordionAnswer index={2}>A render prop is a technique where you pass a function as a prop to a component, and that function returns JSX.</Accordion.AccordionAnswer>
                    </div>
                    
                    <div className='border-2 border-gray-200/30 py-2 px-4 rounded-2xl my-1.5 hover:bg-blue-200/20  hover:shadow-sm'>
                        <Accordion.AccordionItem index={3}>Is Tailwind customizable?</Accordion.AccordionItem>
                        <Accordion.AccordionAnswer index={3}>Yes! You can customize themes, colors, spacing, breakpoints, and even create your own utility classes in tailwind.config.js.</Accordion.AccordionAnswer>
                    </div>
                </Accordion>
            </div>
        </div>
    )
}

export default AccordionPage;