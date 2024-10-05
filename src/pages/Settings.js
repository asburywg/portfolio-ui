import { TabView, TabPanel } from "../layout/Tabs.js";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Divider } from 'primereact/divider';

/*
<Accordion activeIndex={0}>
                        <AccordionTab header="Revenue">

                        {['Salary', 'Investment', 'Business', 'Other'].map(rollup => (
                            <>
                            <span className="ml-6 mt-5 font-bold">{rollup}</span>
                            <hr class="h-px mb-3 bg-gray-200 border-0 dark:bg-gray-200"/>
                            <div className="mx-auto w-full">
                                {['Salary', 'Investment', 'Business', 'Other'].map(rollup => (
                                    <div key={rollup} className="flex">
                                        <div style={{ flex: '1'}}>
                                            <span>{rollup}</span>
                                        </div>
                                        <div style={{ flex: '1' }}>
                                            <div style={{ display: 'flex' }}>
                                                <i className="pi pi-pencil" style={{ marginRight: '10px' }}></i> 
                                                <i className="pi pi-trash"></i> 
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            </>
                        ))}
                        </AccordionTab>
*/

export default function SettingsPage() {

    return (
        <TabView>
            <TabPanel header="Categories">
                <div className="mx-auto w-1/3">
                    <Accordion activeIndex={0}>
                        <AccordionTab header="Revenue">

                                {['Salary', 'Investment', 'Business', 'Other'].map(rollup => (

                                    <div class="ml-8 space-y-4">
                                    <div class="flex items-center space-x-4">
                                        <div>
                                            <h3 class="text-md font-semibold">{rollup}</h3>
                                        </div>
                                    </div>
                                    <div class="ml-8 space-y-2">
                                <div class="flex items-center space-x-4">
                                        <div>
                                            <p class="text-gray-600">HR Specialist</p>
                                        </div>
                                    </div>
                                </div>
                                    </div>
            
                                ))}
                            
                        </AccordionTab>
                        <AccordionTab header="Expenses">
                        
                        </AccordionTab>
                        <AccordionTab header="Non-Operating">
                        
                        </AccordionTab>
                    </Accordion>
                </div>
                
            </TabPanel>

            
        </TabView>
    )
}