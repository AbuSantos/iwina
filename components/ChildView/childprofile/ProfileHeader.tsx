import { Fredoka, Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"] })
const ProfileHeader = ({ username, taskCount, image }) => {
    return (
        <div>
            <section className="">
                <h2 className={`${fredoka.className} text-gray-700 font-medium text-lg capitalize `}>
                    Hi, {username}</h2>
                <span className={`montserrat.className text-sm text-slate-600`}>
                    {` you've completed ${taskCount} tasks, ${taskCount === 0 ? "more chores gets you more point" : "amazing job"}  ${username}`}
                </span>
            </section>
        </div>
    )
}

export default ProfileHeader