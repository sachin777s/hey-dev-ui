import { Button } from '@nextui-org/react'
import React, { useState } from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'

const ThemeChanger = () => {

    //Change theme to Dark
    const setDarkMode = () => {
        document.querySelector("body").classList.add("dark")
        document.querySelector("body").classList.remove("light");
        localStorage.setItem("theme", "dark")
    }

    //Change theme to Light
    const setLightMode = () => {
        document.querySelector("body").classList.add("light")
        document.querySelector("body").classList.remove("dark");
        localStorage.setItem("theme", "light")
    }

    const [theme, setTheme] = useState(() => {
        const theme = localStorage.getItem("theme")
        if (!theme) {
            setDarkMode();
            return "dark";
        } else {
            if (theme === "light")
                setLightMode();
            else
                setDarkMode();

            return theme;
        }
    })


    const themeChangeHandler = () => {
        if (theme === "dark") {
            setLightMode();
            setTheme("light");
        } else {
            setDarkMode();
            setTheme("dark");
        }
    }

    return (
        <Button isIconOnly radius='full' onClick={() => themeChangeHandler()} className=''>
            {
                theme === "light"
                    ? <BsMoon size={22} />
                    : <BsSun size={22} />
            }
        </Button>
    )
}

export default ThemeChanger;