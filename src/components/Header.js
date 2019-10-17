import React from 'react'
import bgImg from '../img/bg.png'

export default function Header() {
    return (
        <div>
            <header>
                <div>
                    <img src={bgImg} className="header"></img>
                    <div className="header-content text-left">
                        <h1>Stranger Things</h1>
                        <span>Strange sightings. Government secrets. Fearless kids.<br />
                            And a dark force that turns a small town upside down.</span>
                    </div>
                </div>
                
            </header>
        </div>
    )
}
