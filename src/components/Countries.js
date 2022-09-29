import React from 'react'

import { v4 as uuidv4 } from 'uuid';
import Country from './Country'
import style from './countries.module.css'

const Countries = (props) => {
    return (
        <section className={style.countries}>
            {
                props.countries.map((country) => {
                    let countryObj = {id: uuidv4(), country}
                    return <Country key={countryObj.id} {...countryObj} onRemoveCountry={props.onRemoveCountry} />
                })
            }
        </section>
    )
}

export default Countries