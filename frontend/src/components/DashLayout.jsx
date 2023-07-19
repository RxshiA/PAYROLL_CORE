import { Outlet } from 'react-router-dom'
import styles from '../style'
import { Footer } from './LandingPage'
import DashHeader from './DashHeader'

const DashLayout = () => {
    return (
        <>
            <div className="bg-primary w-full overflow-hidden">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <DashHeader />
                    </div>
                </div>

                <div className={`bg-primary ${styles.flexStart}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Outlet />
                        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                            <div className={`${styles.boxWidth}`}>
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
export default DashLayout