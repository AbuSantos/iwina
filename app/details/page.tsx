import ProfileFooter from '@/components/ParentProfile/ProfileFooter'
import ProfileNav from '@/components/ParentProfile/ProfileNav'
import resident from "@/public/images/resident.svg"
import userDetails from "@/public/images/userDetails.svg"
import bank from "@/public/images/bank.svg"


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
            <section>
                <ProfileNav profileLinks={profileLinks} />
            </section>

            <footer>
                <ProfileFooter />
            </footer>
        </div>
    )
}

export default page