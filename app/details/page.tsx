import ProfileFooter from '@/components/ParentProfile/ProfileFooter'
import ProfileNav from '@/components/ParentProfile/ProfileNav'
import resident from "@/public/images/resident.svg"
import userDetails from "@/public/images/userDetails.svg"
import bank from "@/public/images/bank.svg"
import Header from '@/components/ParentProfile/Header'
import Warning from '@/components/ParentProfile/Warning'


const profileLinks = [

    {
        link: '/details', icon: userDetails, title: "Personal Details"
    },
    {
        link: '/map', icon: bank, title: "Bank Details"
    },
    {
        link: '/calendar', icon: resident, title: "Residential Details"
    },
]

const page = () => {
    return (
        <div>
            <header>
                <Header />
            </header>
            <section>
                <ProfileNav profileLinks={profileLinks} />
            </section>

            <footer>
                <div className='absolute bottom-20 right-0 left-0'>
                    <Warning />
                </div>
                <ProfileFooter />
            </footer>
        </div>
    )
}

export default page