import ResumeContext from "./ResumeContext";
import { useState, useRef, useEffect, useMemo } from "react";
import { useReactToPrint } from 'react-to-print';
import { getDatabase, ref, push, set, get } from "firebase/database"


const ResumeState = (props) => {
    const componentRef = useRef();
    const initialData = useMemo(() => {
        const initialData = {
            personalData: {
                profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNI3kQLeYMnpy05PhEiuzS1rtRmNVL7VKvwcE4ACmQSQT1rRmUO5mHLyjH-mGHq0ueUQY&usqp=CAU',
                name: "Your Name",
                summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                profile: "Work Profile",
                address: "Address Line",
                phone: "Phone Number",
                email: "Email Address",
                skill: 'Your, Skills, are, shown, here',
            },
            projectData: {
                projectTitles: { pTitle1: "Project Title 1" },
                projectDesc: { pDescription1: "Project Description 1" },
            },
            educationData: {
                educationTitles: { eTitle1: "Education Title 1" },
                educationDesc: { eDescription1: "Education Description 1" },
            },
            workData: {
                workTitles: { wTitle1: "Work Title 1" },
                workDesc: { wDescription1: "Work Description 1" },
            },
            awardData: {
                awards: 'Certificate of Appreciation - 2019, Certificate of Appreciation - 2018'
            }
        }
        return initialData
    }, [])

    const [data, setData] = useState({})
    const [themeData, setThemeData] = useState(initialData)
    const [checkProj, setCheckProj] = useState(false);
    const [checkWork, setCheckWork] = useState(false);
    const [checkAward, setCheckAward] = useState(false);
    const [loading, setLoading] = useState(false);
    //Change bellow two state for create any new Theme
    const [showComponent, setShowComponent] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('Theme1');
    const [selectBtn, setSelectBtn] = useState(true)
    const [signup, setSignup] = useState(false)
    const [signedin, setSignedin] = useState(localStorage.getItem('user') ? true : false)
    const [user, setUser] = useState(
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    )
    const [selectedData, setSelectedData] = useState(null)

    useEffect(() => {
        if(!selectedData){
            setThemeData(initialData)
        }
    }, [selectedData, initialData])

    useEffect(() => {
        if(signedin){
            const db = getDatabase();
            get(ref(db, 'users/' + user.uid)).then((snapshot) => {
                if (snapshot.exists()) {
                    setData(snapshot.val().Data)
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        else{
            setData({})
        }
    }, [signedin, user])

    useEffect(() => {
        if(!signedin){
            setThemeData(initialData)
        } else{
            localStorage.setItem('user', JSON.stringify(user))
        }
    }, [signedin,initialData,user])

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforePrint: () => {
            setLoading(true)
        },
        onAfterPrint: () => {
            setLoading(false)
            const db = getDatabase();
            if(selectedData === null){
                push(ref(db, 'users/' + user.uid + '/Data'), {
                    name: user.name + ' ' + user.data_length,
                    theme: currentTheme,
                    data: themeData
                }).then(
                    setUser({...user, data_length: user.data_length + 1})
                ).catch((error) => {
                    console.error(error);
                });
                setData({...data, [user.data_length]: {name:data[selectedData].name, theme: currentTheme, data: themeData}})
            } else{
                set(ref(db, 'users/' + user.uid + '/Data/' + selectedData), {
                    name: data[selectedData].name,
                    theme: currentTheme,
                    data: themeData
                }).catch((error) => {
                    console.error(error);
                });
                setData({...data, [selectedData]: {name:data[selectedData].name, theme: currentTheme, data: themeData}})
            }
            setSelectedData({})
        }
    });

    return (
        <ResumeContext.Provider value={{ initialData, selectBtn, setSelectBtn, checkAward, setCheckAward, componentRef, handlePrint, currentTheme, setCurrentTheme, showComponent, setShowComponent, loading, setLoading, themeData, setThemeData, checkProj, checkWork, setCheckProj, setCheckWork, signup, setSignup, signedin, setSignedin, user, setUser, selectedData, setSelectedData, data, setData }}>
            {props.children}
        </ResumeContext.Provider >
    )
}

export default ResumeState