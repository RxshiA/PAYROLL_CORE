import styles from '../../style'
import { Billing, Business, CTA, Footer, Navbar, Hero } from "../LandingPage";
import React from 'react'

const LandingHome = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Business />
          <Billing />
          <CTA />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default LandingHome