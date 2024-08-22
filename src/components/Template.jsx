import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Footer from "./Footer";



function Template({children}) 
{
    return (
        <>
            <Navbar/>
            <Dashboard>
                {children}
            </Dashboard>
            <Footer/>
        </>
    );

}
export default Template; 