import React, { useState, useEffect } from "react";
import Confetti from "react-confetti"; // Import confetti
import  "./styles.css"
import spinlogo from "../src/spinlogo.gif"


const LuckyDraw = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current index of the spinning names
  const [winnerIndex, setWinnerIndex] = useState(null); // Stores the index of the winner
  const [winnerName, setWinnerName] = useState(""); // Stores the winner's name
  const [winnerSurname, setWinnerSurname] = useState(""); // Stores the winner's surname
  const [isSpinning, setIsSpinning] = useState(false); // Tracks if spinning is active
  const [showConfetti, setShowConfetti] = useState(false); // Tracks if confetti should be shown
  const [winnersList, setWinnersList] = useState([]); // Keeps track of all winners

  // Map of numbers to name and surname
  const nameMapping = [
    {
      "name": "RIMJHIM MOBILE",
      "surname": "KUSHAL BOHRA"
    },
    {
      "name": "KANHA MOBILE(UMARIA)",
      "surname": "JAY WADHWANI"
    },
    {
      "name": "SAM MOBILE SHOPPY(CENTRALISED)",
      "surname": "SUDESH SACHDEV"
    },
    {
      "name": "SATYA SAI MOBILE SHOP (SHAHDOL)",
      "surname": "SATYA NARAYAN SONI"
    },
    {
      "name": "RADHA KRISHNA MOBILE",
      "surname": "VISHAL LALWANI"
    },
    {
      "name": "REAL MOBILE(CENTRALISED)",
      "surname": "INDER LAL AHUJA"
    },
    {
      "name": "MAA MOBILE-JABALPUR",
      "surname": "NAYAN PATEL "
    },
    {
      "name": "SATYA WATCH AND MOBILE",
      "surname": "LALCHAND GULWANI"
    },
    {
      "name": "NEW VIPIN MOBILE SHOP",
      "surname": "SURENDRA KUMAR SHAH"
    },
    {
      "name": "GOOGLE MOBILE",
      "surname": "ARVIND SONI"
    },
    {
      "name": "MAA SHARDA MOBILE SHOP",
      "surname": "SARVESH KUMAR GUPTA"
    },
    {
      "name": "BALAJI MOBILE WARASEONI",
      "surname": "AMIT JETHWANI"
    },
    {
      "name": "OM MOBILE",
      "surname": "VINOD DATRE"
    },
    {
      "name": "SHRI HARDEV MOBILE",
      "surname": "SHARAD CHATRI "
    },
    {
      "name": "KIRAN MOBILE",
      "surname": "ROSHAN LAL GUPTA"
    },
    {
      "name": "MOHIT MOBILE SHOP(SATNA)",
      "surname": "MOHIT GUPTA"
    },
    {
      "name": "ZUBER MOBILE KATANGI",
      "surname": "ZUBER MEMON"
    },
    {
      "name": "KAPTAN TELECOM CENTRE",
      "surname": "ASWANI KUMAR JAISWAL"
    },
    {
      "name": "HINDUSTAN MOBILE CENTER",
      "surname": "NAVEED IRAQUI"
    },
    {
      "name": "VARDHAMAN CELLCOM",
      "surname": "NITIN JAIN"
    },
    {
      "name": "NEW MOBILE SHOPY",
      "surname": "RAJESH AGRAWAL"
    },
    {
      "name": "GOVIND MOBILE AND ELECTRONIC SHOP",
      "surname": "RAM PRAKASH CHANDEL "
    },
    {
      "name": "HELLO MOBILE (SIDHI)",
      "surname": "JITENDRA GUPTA"
    },
    {
      "name": "SHIVAM MOBILE(ITI)",
      "surname": "SHVAM SAHU"
    },
    {
      "name": "SAGAR MOBILE",
      "surname": "SAGAR JAIN"
    },
    {
      "name": "SWEKCHA MOBILE",
      "surname": "DILIP GUPTA"
    },
    {
      "name": "GOLU MOBILE",
      "surname": "SHIV KUMAR GUPTA"
    },
    {
      "name": "NEW LATEST MOBILE",
      "surname": "ANIL GUPTA"
    },
    {
      "name": "MOBILE BAZAR-SATNA",
      "surname": "UPENDRA PATEL"
    },
    {
      "name": "SATGURU KRIPA MOBILE",
      "surname": "SAHIL RANANI"
    },
    {
      "name": "ABHISHEK MOBILE LANJI",
      "surname": "RAHUL BADME"
    },
    {
      "name": "ADVANI SALES",
      "surname": "DEEPAK ADVANI"
    },
    {
      "name": "THAKRE DIGITAL STORE",
      "surname": "SUSHIL THAKRE"
    },
    {
      "name": "VERMA MOBILES",
      "surname": "ATUL VERMA"
    },
    {
      "name": "SUMIT MOBILE (MAIHAR)",
      "surname": "SHUBHAM KUMAR GUPTA"
    },
    {
      "name": "ALOK MOBILE(REWA)",
      "surname": "RAHUL PATEL"
    },
    {
      "name": "SONU MOBILE SHOP-SATNA",
      "surname": "SHANKAR PRASAD SAHU"
    },
    {
      "name": "GEETANJALI MOBILE ELECTRONICS",
      "surname": "SANDEEP SONI"
    },
    {
      "name": "GOVERDHAN MOBILE COLLECTION",
      "surname": "LAKHAN AHUJA"
    },
    {
      "name": "BAJRANG MOBILE (BHOPAL)",
      "surname": "JAL TALREJA"
    },
    {
      "name": "PRATAYANCHA MOBILE AND ELECTRONICS",
      "surname": "SURENDRA SINGH THAKUR "
    },
    {
      "name": "N-DEEPA MOBILE",
      "surname": "VEERU VISHWAKARMA"
    },
    {
      "name": "YOGI MOBILE SHOP",
      "surname": "YOGENDRA RATHORE "
    },
    {
      "name": "PRAGATI ENTERPRISES AND MOBILE",
      "surname": "RAMAKANT PATEL"
    },
    {
      "name": "GOPAL STATIONERY AND BOOK HOUSE",
      "surname": "SUMEET LALCHANDANI"
    },
    {
      "name": "N-MARKS GENERAL STORES",
      "surname": "MANISH DEVJANI"
    },
    {
      "name": "SRASHTI ENTERPRISES",
      "surname": "MAHESH KUMAR"
    },
    {
      "name": "NEW CHOURASIYA MOBILE (GADAKOTA)",
      "surname": "ASHISH KUMAR CHOURASIYA"
    },
    {
      "name": "MAMAJI MOBILE AND ELECTRICALS",
      "surname": "MANISH SACHDEVA "
    },
    {
      "name": "BALAJI MOBILE (BETUL)",
      "surname": "Lakhan Khilnani"
    },
    {
      "name": "RAIN POINT CELLULAR",
      "surname": "PANKAJ GUPTA"
    },
    {
      "name": "MOBILE JUNCTION HARDA",
      "surname": "BURULAL PRAJAPAT"
    },
    {
      "name": "DEEP TRADERS (OLD BRANCH)",
      "surname": "PRAKASH BALECHA"
    },
    {
      "name": "N-VARIETY MUSIC CORNER",
      "surname": "HITESH KESHWANI"
    },
    {
      "name": "SHUBHAM PROVISION",
      "surname": "PRASOON JAIN"
    },
    {
      "name": "ANANDI MOBILE SHOPPE",
      "surname": "ROHIT BADKUL"
    },
    {
      "name": "BOMBAY TELECOM",
      "surname": "SARFRAZ MOTLANI"
    },
    {
      "name": "VERMATS MOBILE ELECTRONICS AND FURNITURE",
      "surname": "VYAS MUNI VERMA"
    },
    {
      "name": "GUNJAN RADIO",
      "surname": "DEPENDRA GURJAR"
    },
    {
      "name": "CHOURASIYA MOBILE COLLECTION",
      "surname": "BANTEY CHORASIYA "
    },
    {
      "name": "SIMRAN MOBILE (REHTI)",
      "surname": "RAMKISHORE YADAV"
    },
    {
      "name": "LALIT MOBILE ATHNER",
      "surname": "LALIT SAHU"
    },
    {
      "name": "TIRUPATI MOBILE (AMLA)",
      "surname": "SACHIN PATNE"
    },
    {
      "name": "SANSKAR MOBILE 2",
      "surname": "ALOK GUPTA"
    },
    {
      "name": "HARE MADHAV MOBILE",
      "surname": "ASHOK SHARMA"
    },
    {
      "name": "NEERAJ MOBILE SHOP",
      "surname": "AKHILESH CHOUKIKAR"
    },
    {
      "name": "LALY COMMUNICATION",
      "surname": "VINOD THAKUR"
    },
    {
      "name": "SHRI PARAS MOBILE AND SALES",
      "surname": "ABHINAV JAIN"
    },
    {
      "name": "PANKAJ MOBILES",
      "surname": "PANKAJ SAHU"
    },
    {
      "name": "SHIVAM ENTERPRISES - MORENA",
      "surname": "Shivam Verma"
    },
    {
      "name": "GAURAV WATCH-AMBAH",
      "surname": "gaurav rathore "
    },
    {
      "name": "SHAILU MOBILE",
      "surname": "DEEPAK AGRAWAL"
    },
    {
      "name": "SANJAY MOBILE MORENA",
      "surname": "Sanjay Rathore"
    },
    {
      "name": "ISHIKA MOBILE- TIKAMGARG",
      "surname": "DHARMDAS AHIRWAR"
    },
    {
      "name": "BALAJI TRADERS",
      "surname": "LOKENDRA AGARWAL"
    },
    {
      "name": "JAI MAA KAILADEVI MOBILE MORENA",
      "surname": "Pavan Dube"
    },
    {
      "name": "SHRI BANKE BIHARI JI MOBILE GALLERY (CENTRALISED)",
      "surname": "CHINAR GOYAL"
    },
    {
      "name": "JAI MILAN MOBILE",
      "surname": "VINAY MILAN"
    },
    {
      "name": "SHRI KRISHNA MOBILE WORLD THATIPUR",
      "surname": "Mr.Vikas Gupta"
    },
    {
      "name": "PAVAN STATIONARY-DABRA (CENTRALIZED)",
      "surname": "Sandeep Gupta"
    },
    {
      "name": "MAHAKAL MOBILE SHOP",
      "surname": "Raman Gupta"
    },
    {
      "name": "GANPATI MOBILE-BAMOR",
      "surname": "AJAY SHIVHARE"
    },
    {
      "name": "VAISHNAVI MOBILE SALES- BHIND",
      "surname": "ANIL KUMAR"
    },
    {
      "name": "NAKODA SALES CORPORATION",
      "surname": "PANKAJ JAIN"
    },
    {
      "name": "SHREEJI CORP INDORE (CENTRALIZED)",
      "surname": "VIKRAM CHOUKSEY"
    },
    {
      "name": "RELIABLE MOBILE- JAORA",
      "surname": "ABDUL HAMID"
    },
    {
      "name": "AMIT KIRANA STORE",
      "surname": "AMIT JAIN"
    },
    {
      "name": "RAJENDRA SURI MOBILE MANAWAR",
      "surname": "ANIL JAIN"
    },
    {
      "name": "KAPIL MOBILE(SHAJAPUR)",
      "surname": "VIJAY GHOTHI"
    },
    {
      "name": "PRAKASH RADIO",
      "surname": "LOVE MAKHIJA"
    },
    {
      "name": "JAY MAHADEV",
      "surname": "SUNIL NAGWANI"
    },
    {
      "name": "SATHIYA MOBILE-ALOT (CENTRALIZED)",
      "surname": "VINAY SETHIYA"
    },
    {
      "name": "RAZA MOBILE AND ELECTRONICS-KHAJRANA INDORE",
      "surname": "ASLAM PATEL"
    },
    {
      "name": "TIWARI TELECOMMUNICATION RATLAM",
      "surname": "AJAY TIWARI"
    },
    {
      "name": "GLAMOUR",
      "surname": "ABRAH HUSSAIN MANSOOR"
    },
    {
      "name": "DHRUV MOBILE N ELE (CENTRALIZED)",
      "surname": "SUNIL DHAKAD"
    },
    {
      "name": "KANCHAN ELECTRONICS (CENTRALIZED)",
      "surname": "NAVEEN KHUSHLANI"
    },
    {
      "name": "KHATI PATEL GAROTH",
      "surname": "PAWAN PATEL"
    },
    {
      "name": "SHRI RAM ENTERPRISES SITAMAU",
      "surname": "ANIL PATIDAR"
    },
    {
      "name": "JAIN ELECTRONICS PITHAMPUR (CENTRALIZED)",
      "surname": "SUMIT JAIN"
    },
    {
      "name": "AMAN ELECTRONICES",
      "surname": "ATISHAY DESHLEHRA"
    },
    {
      "name": "GURUNANAK MOBILE KUKDESHWER",
      "surname": "KULDEEP SINGH"
    },
    {
      "name": "STANDARD MOBILE PITHAMPUR",
      "surname": "ISHRAN KHATRI"
    },
    {
      "name": "CELLUCOM MG ROAD",
      "surname": "SHELESH BHATIA"
    },
    {
      "name": "MADHULIKA MOBILE MANASA",
      "surname": "BILLU VYAS"
    },
    {
      "name": "PAL SHREE COM RAJIV GANDHI CHOURAHA",
      "surname": "AMIT PAL"
    },
    {
      "name": "RIDHIMAN MOBILE N ELE INDORE",
      "surname": "RAHUL PAL"
    },
    {
      "name": "LOTUS MOBILE GALLERY (CENTRALIZED)",
      "surname": "MOHIT SINGH"
    },
    {
      "name": "TAPASYA MOBILE SHOP",
      "surname": "VIKASH KHATRI"
    },
    {
      "name": "ORANGE MOBILE GANDHI NAGAR",
      "surname": "PRATEEK ACHARYA"
    },
    {
      "name": "AMAAN MOBILE- MEHIDPUR",
      "surname": "SADDAM NAGORI"
    },
    {
      "name": "SANGAM MOBILE DEWAS",
      "surname": "IRSHAD JI SHAIKH"
    },
    {
      "name": "AKBARI AGENCY",
      "surname": "ABDEALI BATALWA"
    },
    {
      "name": "PORWAL MOBILE- PIPLIYA",
      "surname": "SUNIL PORWAL"
    },
    {
      "name": "SS MOBILE STORE (CENTRALIZED)",
      "surname": "KRIPAL JI"
    },
    {
      "name": "THE BEST PRICE",
      "surname": "MAYANK MEGHANI"
    },
    {
      "name": "POOJA APPLINCES-INDORE",
      "surname": "ABHILASHA SAHU"
    },
    {
      "name": "NAKODA MOBILE DALAUDA",
      "surname": "SHUBHAM JAIN"
    },
    {
      "name": "SHIV SHAKTI MOBILEI NGORIYA",
      "surname": "BHARAT JI"
    },
    {
      "name": "VIKAS ENTERPRISES JHABUA",
      "surname": "VIKAS PADIYAR"
    },
    {
      "name": "R K MOBILE N COMPUTERS (CENTRALIZED)",
      "surname": "RAHUL SAHU"
    },
    {
      "name": "GURU KRIPA(INDORE)",
      "surname": "GURDEEP SINGH OBERAI"
    },
    {
      "name": "BALAJI MOBILE-TAL",
      "surname": "VINAY PORWAL"
    },
    {
      "name": "BHANSALI MOBILES-THANDLA",
      "surname": "NIKHIL BHANSALI"
    },
    {
      "name": "SANWARIYA MOBILE NX-UJJAIN",
      "surname": "ANAND THANI"
    },
    {
      "name": "NEW RADHA SOMI (CENTRALIZED)",
      "surname": "PIYUSH JAJU"
    },
    {
      "name": "D K MOBILES-RATLAM",
      "surname": "Arun gurjar"
    },
    {
      "name": "BATHARA MOBILE NAYAGAON",
      "surname": "DEVI LAL"
    },
    {
      "name": "VINOD TELECOM",
      "surname": "GIRISH ADVANI"
    },
    {
      "name": "RAJU MOBILE-UJJAIN",
      "surname": "ABDUL HAMID NAGORI"
    },
    {
      "name": "HARI OM MOBILE- RATLAM",
      "surname": "OM PRAKASH MAMWANI"
    },
    {
      "name": "ANKIT MOBILE-TEJAJI NAGAR",
      "surname": "ROHIT PATEL"
    },
    {
      "name": "BALAJI ENTERPRISE (CENTRALIZED)",
      "surname": "MUKESH AGRAWAL"
    },
    {
      "name": "SHRI NAKODA MOBILE-NAGDA (DHAR)",
      "surname": "SHALIN JAIN"
    },
    {
      "name": "MANSHA DEVI MOBILE",
      "surname": "RITESH BHAWSAR"
    },
    {
      "name": "SATYAM SHIVAM SUNDARAM MUNDI",
      "surname": "SHYAM GURJAR"
    },
    {
      "name": "ARIHANT ENTERPRISES (CENTRALIZED)",
      "surname": "SANAJAY KUMAR JAIN"
    },
    {
      "name": "SONI MOBILE",
      "surname": "VIKAA SONI"
    },
    {
      "name": "JAISWAL MOBILE-JHARDA",
      "surname": "AKHILESH JAISWAL"
    },
    {
      "name": "MAHAVEER WATCH MANDSAUR",
      "surname": "SANAJAY KUMAR JAIN"
    },
    {
      "name": "JATAN SHREE",
      "surname": "VIKAA SONI"
    },
    {
      "name": "SHREE SAI TELECOM ITAWA",
      "surname": "PRADEEP YADAV"
    },
    {
      "name": "AGRAWAL POINT PITHAMPUR",
      "surname": "RAJESH AGRAWAL"
    },
    {
      "name": "BALAJI MOBILE MANDSAUR",
      "surname": "MANISHA NENWANI"
    },
    {
      "name": "GORAV AGENCE NAGDA",
      "surname": "GAURAV NAGAR"
    },
    {
      "name": "PRADEEP AGENCIES",
      "surname": "PRADEEP MALKANI"
    },
    {
      "name": "HOLLYWOOD MOBILE",
      "surname": "AKHILESH RATHORE"
    },
    {
      "name": "AJAY MOBILE MANASA",
      "surname": "AJAY SONI"
    },
    {
      "name": "ANU SHREE RATAILS RATLAM (CENTRALIZED)",
      "surname": "SAURABH JAIN"
    },
    {
      "name": "RAJ SAMANVAY(SHAJAPUR)",
      "surname": "RAJVARDHAN SHARMA"
    },
    {
      "name": "JSM TRADERS-RATLAM",
      "surname": "SHIVAM PALIWAL"
    },
    {
      "name": "JAY BABA MOBILE- BHURHANPUR",
      "surname": "DEEPAK RAJANI"
    },
    {
      "name": "NEW GOTHI MOBILE(SHAJAPUR)",
      "surname": "RAHUL GHOTHI"
    },
    {
      "name": "KRISNA ELECTRICALS AND MOBILE GALLERY",
      "surname": "NITIN DABLANI"
    },
    {
      "name": "SHREE NAKODA MOBILE MANASA",
      "surname": "PANKAJ GANDHI"
    },
    {
      "name": "VISHWAS MOBILE MANDSAUR",
      "surname": "TEJPAL PATIDAR"
    },
    {
      "name": "R J MOBILE - UJJAIN",
      "surname": "JAY ANDEL"
    },
    {
      "name": "SHREE KRISHNA ELECTRONIC",
      "surname": "JAYDEEP PATEL"
    },
    {
      "name": "JAIN TELECOM(DEWAS)",
      "surname": "ABHISHEK JAIN"
    },
    {
      "name": "SHREE CHARBHUJA MOBILE JAWAD",
      "surname": "SHEETAL NOVELAKHA"
    },
    {
      "name": "SONI TV CENTER DALOUDA",
      "surname": "SANJAY SONI"
    },
    {
      "name": "UTTAM MOBILE GALLERY- AGAR",
      "surname": "SHAILENDRA BHAWSAR"
    },
    {
      "name": "GLOBAL MOBILE-UJJAIN",
      "surname": "MOHMMAD AASIF "
    },
    {
      "name": "Mahalaxmi mobile kukshi",
      "surname": "PRAMIT SHARMA"
    },
    {
      "name": "SHAKTI MOBILE BADNAGAR",
      "surname": "ABHISHEK KUMAWAT "
    },
    {
      "name": "ADITYA MOBILE-BIAORA",
      "surname": "RAVI PRAJAPATI"
    },
    {
      "name": "SAI SHRDDHA MOBILE UJJAIN",
      "surname": "DHEERAJ LADUNA"
    },
    {
      "name": "SHIV SHAKTI ELECTRONICS FURNITURE",
      "surname": "ANKIT TIWARI"
    },
    {
      "name": "SHRI KRISHNA MOBILE MUNDI",
      "surname": "SURENDRA SOLANKI"
    },
    {
      "name": "DK MOBILE UJJAIN",
      "surname": "SUNIL CHOUDHARY"
    },
    {
      "name": "JUGAL ELECTRONICS N MACHINERY",
      "surname": "RAVI ARODA"
    },
    {
      "name": "MANNAT MOBILE",
      "surname": "SANJAY CHOUDHARY"
    },
    {
      "name": "LUCKY MOBILE CENTER-NARSINGARH",
      "surname": "PARANJEET SINGH PAHWA"
    },
    {
      "name": "SHREE TIRUPATI-DEWAS",
      "surname": "Raju Patel"
    },
    {
      "name": "AYUSHI STD",
      "surname": "ANIMESH PORWAL"
    },
    {
      "name": "NAAZ MOBILE AND ELECRONICS-INDORE",
      "surname": "Sameer"
    },
    {
      "name": "S H ELECTRONICS AND FURNITURE-INDORE",
      "surname": "PARVEJ  KHAN"
    },
    {
      "name": "HELPLINE MOBILE",
      "surname": "SALMAN MANSURI"
    },
    {
      "name": "KING MOBILE KALANI NAGAR",
      "surname": "SHAHID ALI"
    },
    {
      "name": "NEW PATEL TELECOM DEPALPUR",
      "surname": "RAVI PATEL"
    },
    {
      "name": "SHREYASH ENTERPRISES-PITHAMPUR",
      "surname": "MANISH KUMAR VAGEELE"
    },
    {
      "name": "ANANT ENTERPRIZES",
      "surname": "RAHUL AGARWAL"
    },
    {
      "name": "HOTLINE SERVICE CENTER (CENTRALIZED)",
      "surname": "AKASH CHOURASIYA"
    },
    {
      "name": "RIDDHI SIDDHI MOBILE ALOTE",
      "surname": "AJAY PAL SINGH SOLANKI"
    },
    {
      "name": "MUKUL TELECOM DHAR",
      "surname": "MUKUL RATHORE"
    },
    {
      "name": "PUSHPRAJ MOBILE-THANDLA",
      "surname": "RAKESH RATHORE"
    },
    {
      "name": "MOBILE KING MANDSAUR",
      "surname": "SATYANARAYAN MALI"
    },
    {
      "name": "JUNEJA ELECTRONICS DEWAS",
      "surname": "MANPREET JUNEJA"
    },
    {
      "name": "CHEEZAL MOBILE (CENTRALIZED)",
      "surname": "ANISH KUMAR  CHABRA"
    },
    {
      "name": "PATEL MOBILE -DHAR",
      "surname": "AMZAD PATEL"
    },
    {
      "name": "MAYUR MOBILE SHOPEE KHANDWA",
      "surname": "MAYUR MANGWANI"
    },
    {
      "name": "HITANSHI MOBILE GALLERY-KHARGONE",
      "surname": "DEEPAK SOLANKI"
    },
    {
      "name": "AJAY ENTERPRISES-PALDA INDORE",
      "surname": " AJAY JONDHWAL"
    },
    {
      "name": "SAI TRADERS KANTHAL ROAD",
      "surname": "ANIL UTHRA"
    },
    {
      "name": "SHIVA MOBILE CHANDRVTI GANG",
      "surname": "MR. LAKHAN PATEL"
    },
    {
      "name": "DISH U S MOBILE GALARY",
      "surname": "SHUBHAM KALE"
    },
    {
      "name": "THE PATIL MOBILE STORE-KHARGONE",
      "surname": "DEEPAK PATIL"
    },
    {
      "name": "OKAY MOBILES RAJENDRA NAGAR",
      "surname": "Vipul"
    },
    {
      "name": "PRACHI MOBILE( BADWANI)",
      "surname": "MANOJ NAGOR"
    },
    {
      "name": "RUNWAL SONS",
      "surname": "PARAG RUNWAL"
    },
    {
      "name": "JK MOBILES INDORE",
      "surname": "JAI KESWANI"
    },
    {
      "name": "MITTAL MOBILE RATANGARH",
      "surname": "VISHAL MITTAL"
    },
    {
      "name": "BHADORIYA MOBILE GALARY CENTRALIZED)",
      "surname": "SOURABH BHADORIYA"
    },
    {
      "name": "ZAM ZAM MOBILE PITHAMPUR (CENTRALIZED)",
      "surname": "PRABHAKAR"
    },
    {
      "name": "RELWANI ELECTRONICS SHOP",
      "surname": "RAJESH  RELWANI"
    },
    {
      "name": "SANT SEWALAL MOBILE BEED",
      "surname": "MITHUN PAWAR"
    },
    {
      "name": "BULBUL ELEC MAHESH GARD ROAD",
      "surname": "KAMAL PRAJAPAT"
    },
    {
      "name": "SHREE GANESH MOBILE PITHAMPUR",
      "surname": "SHUBHAM JAIN"
    },
    {
      "name": "AK MOBILE-UJJAIN",
      "surname": "AKASH "
    },
    {
      "name": "VIJAY RADIO",
      "surname": "VIJAY CHANCHLANI"
    },
    {
      "name": "MILAN MOBILE",
      "surname": "Mr.ISHAN BANSAL"
    },
    {
      "name": "GOPAL ELECTRONIC- GUNA (CENTRALIZED)",
      "surname": "Mr.GOPAL OJHA"
    },
    {
      "name": "RAMA MOBILE",
      "surname": "AMBAR GUPATA "
    },
    {
      "name": "SARGAM ELECTRONICS",
      "surname": "Mr.MR. VIJAY AGRAWAL"
    },
    {
      "name": "AGARWAL MOBILE SHOP",
      "surname": "Mr.SOMIL AGRAWAL"
    },
    {
      "name": "MIHANI MOBILE SHOP",
      "surname": "Mr.MR. JACKY MIHANI"
    },
    {
      "name": "N MOBILE JUNCTION INDORE (CENTRALIZED)",
      "surname": "Mr.NIKHILESH SINGHAL"
    },
    {
      "name": "CITY MOBILE SERVICE (CENTRALIZED)",
      "surname": "Mr.ROHIT GUPTA "
    },
    {
      "name": "RATHORE ELECTRONICS COMMUNICATION (CENTRALIZED)",
      "surname": "Mr.DEVENDRA RATHORE"
    },
    {
      "name": "AJANTA ELECTRONICS APP",
      "surname": "Mr.MAYUR JAIN"
    },
    {
      "name": "DK ENTERPRISES- ASHOKNAGAR",
      "surname": "Mr.DEV KRISHNA VASHISHTHA"
    },
    {
      "name": "MAA LAXMI ELECTRONICS",
      "surname": "Mr.SHIVAM GUPTA"
    },
    {
      "name": "SINGHAI TELECOM",
      "surname": "Pankaj Jain"
    },
    {
      "name": "Prakash Music Center-bhopal",
      "surname": "Mr.NAVEEN AHUJA"
    },
    {
      "name": "SHIVANI MOBILE- CHATTARPUR",
      "surname": "Mr.SATISH CHAURASIYA"
    },
    {
      "name": "MANSOORI MOBILE - (CENTRALIZED)",
      "surname": "Mr.JAVED MANSOORI"
    },
    {
      "name": "GOURAV TRADERS",
      "surname": "Mr.GAURAV JAGATI"
    },
    {
      "name": "SHIVA MOBILE",
      "surname": "Mr.SHIVPRATAP TOMAR"
    },
    {
      "name": "MAA GAYATRI MOBILE- INDARGARH(DATIA)",
      "surname": "Mr.SHRIKHANT GUPTA"
    },
    {
      "name": "SHRI RADHA RANI MOBILE",
      "surname": "Mr.PAWAN KUMAR KESHARI"
    },
    {
      "name": "MAA VAISHNO ENTERPRISES GWL (CENTRALIZED)",
      "surname": "Mr.SAURABH RATHORE"
    },
    {
      "name": "KING ELECTRONICS UJJAIN",
      "surname": "Mr.HARSHIT ADWANI"
    },
    {
      "name": "DEV MOBILE(UJJAIN)",
      "surname": "Mr.MANISH CHANDANI"
    },
    {
      "name": "NEW GURU KRIPA",
      "surname": "Mr.ROHIT GARG"
    },
    {
      "name": "THE MOBILE WORLD-SHIVPURI",
      "surname": "Mr. Akhilesh Joshi"
    },
    {
      "name": "RAJ MOBILE (SIDHI)",
      "surname": "Mr.GANPAT GUPTA"
    },
    {
      "name": "ABHISEK MOBILE(GK)",
      "surname": "Mr.ABHISHEK AGRAWAL"
    },
    {
      "name": "SHIV SHAKTI MOBILE GWL",
      "surname": "Mr.SUBHASH  AGRAWAL"
    },
    {
      "name": "BHATIYA MOBILE BAZAR (CENTRALIZED)",
      "surname": "Mr.ASHOK BHATIA"
    },
    {
      "name": "LUCKY MOBILE (CENTRALIZED)",
      "surname": "Mr.UTTAM SINGH KAURAV "
    },
    {
      "name": "ARIHANT ENTERPRISES ASHOKNAGAR",
      "surname": "Mr.JITENDRA JAIN"
    },
    {
      "name": "NAMYA SALES",
      "surname": "Mr.NITIN JAIN"
    },
    {
      "name": "KABRA MO N ELEC KUMBRAJ",
      "surname": "Mr.PUNEET KABRA"
    },
    {
      "name": "SAMRADHI TELECOME N ELECTRONICS",
      "surname": "Mr.PARAS JAIN"
    },
    {
      "name": "AYUSH TELECOM SANAWAD(CENTRALIZED)",
      "surname": "Mr.PIYUSH AIRAN"
    },
    {
      "name": "MIHANI MOBILE GALLERY (ITARSI)",
      "surname": "Chirag Mihani "
    },
    {
      "name": "OM SAI RAM BEVERAGE",
      "surname": "Mr.RAHUL PARIHAR"
    },
    {
      "name": "NEW SUNIL MOBILE",
      "surname": "Mr.SUNIL JAISWAL"
    },
    {
      "name": "RAVI TRADERS RATLAM",
      "surname": "Mr.RAVI GUPTA"
    },
    {
      "name": "ASHOK WATCH",
      "surname": "Mr.HUNNY GUNWANI "
    },
    {
      "name": "DHARMENDRA ELECTRONICS",
      "surname": "Mr.SAPAN GUPTA"
    },
    {
      "name": "ASHA MOBILE COLLECTION (CENTRALIZED)",
      "surname": "Mr.JITENDRA KRIPLANI"
    },
    {
      "name": "ROHIT MOBILES (CENTRALISED)",
      "surname": "Mr.ANIL MANGLANI"
    },
    {
      "name": "ASHISH TRADERS",
      "surname": "Mr.DINESH GUPTA"
    },
    {
      "name": "SHRI RADHEKRISHNA MOBILE SADA COLONY",
      "surname": "Mr.KAMALESH NARBARIYA"
    },
    {
      "name": "SATYAM MOBILE-1",
      "surname": "Mr.Kapil Gupta"
    },
    {
      "name": "GOSWAMI MOBILE",
      "surname": "Mr.SATISH GOSWAMI"
    },
    {
      "name": "JAI BABA MOBILE",
      "surname": "Mr.SHIVAM GUPTA"
    },
    {
      "name": "MOBILE KING",
      "surname": "Mr.LEELESH KAPOOR"
    },
    {
      "name": "VIDHYARTHI MOBILE (CENTRALIZED)",
      "surname": "Mr.ANKIT GUPTA"
    },
    {
      "name": "DH MOBILE PVT LTD (CENTRALIZED)",
      "surname": "Mr.DEVINDER SINGH OBEROI"
    },
    {
      "name": "D J MOBILE",
      "surname": "Mr.DEEPAK PORWAL"
    },
    {
      "name": "SATGURU MOBILES GWALIOR (CENTRALIZED)",
      "surname": "Mr.PRADEEP JOTWANI"
    },
    {
      "name": "KRISHNA MOBILE SAGAR",
      "surname": "Mr Ranjeet Chourasia"
    },
    {
      "name": "ROHIT MOBILE SHOP (CENTRALIZED)",
      "surname": "Mr.SOMESH JAIN"
    },
    {
      "name": "GAURAV ELECTRONICS- PORSHA",
      "surname": "Mr.SAURAV AGRAWAL"
    },
    {
      "name": "VASUNDHARA INFOCOMM (CENTRALIZED)",
      "surname": "Mr.RAJENDRA GOLCHHA"
    },
    {
      "name": "SHIV SAGER MHOW CENTRALIZED",
      "surname": "Mr.PRAKASH VERMA"
    },
    {
      "name": "AMAR ELECTRONICS(CENTRALISED)",
      "surname": "Mr.AMARDEEP SAHU"
    },
    {
      "name": "MIHANI ELECTRONICS (CENTRALIZED)",
      "surname": "Mr.DEEPAK MIHANI"
    },
    {
      "name": "DEV MOBILE (RAISEN)",
      "surname": "Mr.MR TULSI SAHU "
    },
    {
      "name": "SAURABH MOBILE",
      "surname": "Mr.SAURABH JAIN"
    },
    {
      "name": "NEW PADAM SHREE MOBILE",
      "surname": "Mr.MR JAI KUMAR JAIN"
    },
    {
      "name": "PRIYANSHI COMMUNICATION (CENTRALIZED)",
      "surname": "Mr.VIJAY VYAS"
    },
    {
      "name": "RAVI MOBILE (SEONI)",
      "surname": "Mr.RAVI MESHRAM"
    },
    {
      "name": "ANAND MOBILE (CENTRALIZED)",
      "surname": "Mr.ANAND MEHTA "
    },
    {
      "name": "SACHIN ELECTRONICS",
      "surname": "Mr.SACHIN MITTAL"
    },
    {
      "name": "AGRAWAL MOBILE CENTRE (CENTRALIZED)",
      "surname": "Mr.SACHIN AGRAWAL"
    },
    {
      "name": "VARSHA ZONE",
      "surname": "Mr.SUNIL GULABWANI"
    },
    {
      "name": "KHEDAPATI MOBILE (CENTRALIZED)",
      "surname": "Mr.GANESH VIJAYVARGIYA"
    },
    {
      "name": "SOJAB MOBILE",
      "surname": "Mr.KAMRAN SIDDIQUI"
    },
    {
      "name": "DISCO MOBILE (CENTRALIZED)",
      "surname": "Mr.SOURABH MITTAL"
    },
    {
      "name": "MAHAKALI ELECTRONICS-DHAR (CENTRALIZED)",
      "surname": "Mr.RAJESH PATIDAR/ Mr. Sanju Patidar "
    },
    {
      "name": "ADARSH MOBILE (CENTRALIZED)",
      "surname": "Mr.MANOJ HASIJA"
    },
    {
      "name": "NIRANKAR MOBILE POINT (CENTRALIZED)",
      "surname": "Mr.NITESH BHATIYA"
    },
    {
      "name": "SHRI RAM MOBILE(CENTRALIZED)",
      "surname": "Mr.RAKESH SAHU"
    },
    {
      "name": "DHANWANTI MOBILE (CENTRALIZED)",
      "surname": "Mr.MR NITIN DHANWANI / Mr.Yogesh Kheda "
    },
    {
      "name": "MATESHWARI MOBILE UNHEL",
      "surname": "Mr.JITESH JAIN"
    },
    {
      "name": "JYOTI MOBILE HUB MANDSAUR",
      "surname": "Mr.Deepak Jain"
    },
    {
      "name": "NEW AJAY MOBILE (CENTRALIZED)",
      "surname": "Mr.CHANDURAM DOULTANI"
    },
    {
      "name": "N-VIRAAT GIFT ELECTRONICS (CENTRALIZED)",
      "surname": "Mr.VARUN GANDHI"
    },
    {
      "name": "MOBILE AND GADGET (CENTRALIZED)",
      "surname": "Mr.AJAY AHUJA"
    },
    {
      "name": "TOYOTA MOBILE",
      "surname": "Mr.GHANSHYAM PINJANI"
    },
    {
      "name": "HEENA MOBILE",
      "surname": "Mr.MUDIT JAIN"
    },
    {
      "name": "NEW MOBILE PLAZA",
      "surname": "Mr.MOHD.RAFIK"
    },
    {
      "name": "MOBILE AND MORE (CENTRALIZED)",
      "surname": "Mr.PRADEEP PANSARE"
    },
    {
      "name": "JAI TRADERS(CENTRALISED)",
      "surname": "Mr.SAURABH DIGWANI"
    },
    {
      "name": "SUDARSHAN MOBILE",
      "surname": "Mr.NIMESH VIJAYWARGIA"
    },
    {
      "name": "WELCOME MOBILE NAGDA",
      "surname": "Mr.SYED JABIR"
    },
    {
      "name": "MOHIT MOBILE INDORE (CENTRALIZED)",
      "surname": "Mr.MOHIT TIWARI"
    },
    {
      "name": "PANCHHI COMMUNICATION (CENTRALIZED)",
      "surname": "Mr.SWADESH KOURAV"
    },
    {
      "name": "VANDHANA MOBILE SHUJALPUR MANDI",
      "surname": "Mr.BHUPENDRA SINGH SISODIYA"
    },
    {
      "name": "SOORMANDIR MOBILE",
      "surname": "Mr. SARABJIT SINGH"
    },
    {
      "name": "JEEVAN COMM RATLAM",
      "surname": "Mr.RANJEET SINGH"
    },
    {
      "name": "NAKODA NX(CENTRALIZED)- RATLAM",
      "surname": "Mr.GAURAV BORANA"
    },
    {
      "name": "CONNECTING PEOPLE",
      "surname": "Mr.MANMEET SINGH DANG"
    },
    {
      "name": "SHIVSHAKTI ENTERPRISES",
      "surname": "Mr.RAM SAHU"
    },
    {
      "name": "DEVI MOBILE (CENTRALIZED)",
      "surname": "Mr.DILIP KISHNANI"
    },
    {
      "name": "FRIENDS MOBILE (ASHTA)",
      "surname": "Mr. ABHISHEK ARYA"
    },
    {
      "name": "RONIT MOBILE PRABHU DAS",
      "surname": "Mr. SONU BAJAJ"
    },
    {
      "name": "SIDDHI TRADERS (NASRULLAGANJ)",
      "surname": "Mr. SIDDHI KHANDELWAL"
    },
    {
      "name": "JAIN MOBILE POINT",
      "surname": "Mr. RITESH JAIN"
    },
    {
      "name": "SANDEEPNI MOBILE",
      "surname": "Mr. ASHOK KUMAR PATEL"
    },
    {
      "name": "SANDEEP MOBILE CENTER",
      "surname": "Mr. SANDEEP TALEDA"
    },
    {
      "name": "SHIVAM COMMUNICATION(REWA)",
      "surname": "Mr. AJAY SINGH"
    },
    {
      "name": "AJAY MOBILE (JAWA)",
      "surname": "Mr. RAMBABU GUPTA"
    },
    {
      "name": "R07 MOBILE SHOPEE-CENTRALIZED",
      "surname": "Mr. RAHUL JAISWAL"
    },
    {
      "name": "JAI MATA DI MOBILE RAJENDRANAGAR",
      "surname": "Mr. NARAYAN  MOTIYANI"
    },
    {
      "name": "AMAN MOBILE STORE MANPUR (CENTRALIZED)",
      "surname": "Mr. MOHAMMAD AYAAN"
    },
    {
      "name": "VIJAY MOBILE SALES SERVICE",
      "surname": "Mr. VIJAY BUDHANI"
    },
    {
      "name": "ABC MOBILE CENTRALIZED",
      "surname": "Mr. LAVISH KALRA"
    },
    {
      "name": "JAI SHREE PREETAM ENTERPRISES",
      "surname": "Mr. PAWAN PIRIYANI"
    },
    {
      "name": "MANGAL MURTI",
      "surname": "Mr. NEERAJ  PATIDAR"
    },
    {
      "name": "FARKYA MOBILE SALES N SERVICE-MANASA",
      "surname": "Mr. PAWAN FARKYA"
    },
    {
      "name": "YASHIKA MOBILE KHARGONE",
      "surname": "Mr. PANKAJ KUSHWAH"
    },
    {
      "name": "SHRI UMIYA MOBILE",
      "surname": "Mr. MANISH PATIDAR"
    },
    {
      "name": "HARSH ENT SANAWAD",
      "surname": "MR. MANISH AIRAN"
    },
    {
      "name": "PMG ENTERPRISES, MHOW",
      "surname": "  Mr. PRASHANT VIJAYVARGIYA"
    },
    {
      "name": "BHARAT MOBILE UMARIA",
      "surname": "Mr. PANKAJ RAJPOOT"
    },
    {
      "name": "JAI MATA DI MOBILE SHOP",
      "surname": "Mr.MANOJ SAHU "
    },
    {
      "name": "MAHADEV COMM BHURHANPR",
      "surname": "Amit Dalal "
    },
    {
      "name": "SHREE PUSHPAK MOBILE GALLERY-BETMA",
      "surname": "ANAND KUMRAWAT"
    },
    {
      "name": "MANN MARKETING (CENTRALIZED)",
      "surname": "VICKY WADHWANI"
    },
    {
      "name": "NAKODA MOBILE SEHORE",
      "surname": "Mr. Bharat Deshlera"
    },
    {
      "name": "AADI MOBILE SHOP",
      "surname": "Mr. Atul jain"
    },
    {
      "name": "LATEST MOBILE SHOP",
      "surname": "Mr.Akshay khandelwal "
    },
    {
      "name": "ANURAG COLLECTION",
      "surname": "Mr.Ashok Sharma "
    },
    {
      "name": "SHRI BAJRANG MOBILES",
      "surname": "Mr.Praveen RATHORE"
    },
    {
      "name": "OM SAIRAM TRADERS",
      "surname": "Mr.AMIT JAIN"
    },
    {
      "name": "Manvi Mobile & Electronics",
      "surname": "Mr.Ravindra Shivahare "
    },
    {
      "name": "ABHISHEK MOBILE SHOP (OBEDULLAGANJ)",
      "surname": "Mr.Abhishek nagar"
    },
    {
      "name": "MY FONES",
      "surname": "Mr.manan babbar"
    },
    {
      "name": "KRISHNA MOBILE POINT",
      "surname": "Mr.Hemant sahu "
    },
    {
      "name": "RIDDHI TOY GIFT SHOPEE-(CENTRALIZED)",
      "surname": "Mr.VAIBHAV JAIN"
    },
    {
      "name": "NAINSEE MOBILE SHOP",
      "surname": "Mr.Vikas jain "
    }
 
  ]; // Use an array for easy indexing

  const totalParticipants = nameMapping.length;

  // Function to start the lucky draw
  const startLuckyDraw = () => {
    setIsSpinning(true); // Start spinning effect
    setShowConfetti(false); // Hide confetti when spinning starts
    setWinnerIndex(null); // Reset the winner
    setWinnerName(""); // Reset winner's name
    setWinnerSurname(""); // Reset winner's surname

    let randomIndex;

    // Randomly pick an index that has not been a winner yet
    do {
      randomIndex = Math.floor(Math.random() * totalParticipants);
    } while (
      winnersList.includes(randomIndex) &&
      winnersList.length < totalParticipants
    );

    // Start the spinning effect
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalParticipants - 1 ? 0 : prevIndex + 1
      ); // Cycle through indices
    }, 100); // Change names every 100ms

    // Stop the spinning after 2 seconds and set the winner
    setTimeout(() => {
      clearInterval(interval);
      setIsSpinning(false);
      setWinnerIndex(randomIndex);

      // Set the winner's name and surname
      const winnerData = nameMapping[randomIndex];
      if (winnerData) {
        setWinnerName(winnerData.name);
        setWinnerSurname(winnerData.surname);
      } else {
        setWinnerName("No winner");
        setWinnerSurname("");
      }

      // Add the winner to the list if it's not a duplicate
      if (!winnersList.includes(randomIndex)) {
        setWinnersList((prevList) => [...prevList, randomIndex]);
      }

      // Show confetti for 3 seconds after winner is shown
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000); // Confetti for 3 seconds
    }, 4000); // Stop after 2 seconds
  };

  return (
    <div className="container">
      <div>
        <img src={spinlogo}  className="logo1"/>
      </div>
     
       <div>
      <h1 className="head">vivo V40e Launch Lucky Draw</h1>
      <img 
        src={spinlogo}
        width={280}
        
      />
     

      <div className="nameBox">
        <p className="nameDisplay">
          {isSpinning
            ? nameMapping[currentIndex].name // Display spinning name
            : winnerIndex !== null
            ? nameMapping[winnerIndex].name // Display winner's name
            : ""}
        </p>
      </div>
      <button
        onClick={startLuckyDraw}
        
        disabled={isSpinning || winnersList.length === totalParticipants}
      >
        {isSpinning
          ? "Spinning..."
          : winnersList.length === totalParticipants
          ? "No more draws"
          : "Start Draw"}
      </button>
      {winnerIndex !== null && (
        <div className="result">
          <p>Dealer Name:  {winnerName}</p>
          <p>Owner Name:  {winnerSurname}</p>
        </div>
      )}
      {/* Show confetti when there's a winner */}
      {showConfetti && <Confetti />}
    </div>
    <div>
        <img src={spinlogo} width={150} className="logo2"/>
      </div>
    
    </div>
  );  
};

// Styles


export default LuckyDraw;
