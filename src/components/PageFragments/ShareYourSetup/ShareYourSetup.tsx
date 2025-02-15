import classes from './ShareYourSetup.module.css';
import Image from 'next/image'
import share from './share.jpg';
// import nissanCardPath from '@public/images/discovery-section/nissan-card.png'


export function ShareYourSetup() {
    return (
        <div className={classes.component}>
            <div className={classes.wrapper}>
                <p className={classes.description}>
                    Purchase your dream today!
                </p>
                <h3 className={classes.title}>
                    #DreamCar
                </h3>
                <Image src={share} className={classes.image} alt="#TrendingCars" title="#TrendingCars" />
            </div>
        </div>
    )
}