import React, { useState, useEffect }from 'react';
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton';
import SearchImage from '../../assets/images/receipt_finder_logo_1@4x.png';
import './style.scss';


const SearchInput = (props) => {
   const handleChange = (e) => {
      props.updateSearchCriteriaHandler(props.searchElement, e.target.value);
   }

   return (
      <div className="input-container">
         <label>{props.label}</label>
         <input
            type={props.type ? props.type : 'input'}
            placeholder={props.placeholder ? props.placeholder : ''}
            value={props.value}
            onChange={handleChange}
         />
      </div>
   );
}

const Home = () => {
   useEffect(() => {
      document.title = 'Pilot | Search Transactions';
  }, []);

  const [validationMessage, setValidationMessage] = useState('');
   const [searchCriteria, setSearchCriteriatValues] = useState({
      startDate: '',
      endDate: '',
      ticketNumber: '',
      storeNumber: '',
      authCode: '',
      truckNumber: '',
      checkNumber: '',
      cardLastFour: ''
   });

   const updateSearchCriteria = (key, value) => {
      const updatedSearchCriteria = {
         startDate: searchCriteria.startDate,
         endDate: searchCriteria.endDate,
         ticketNumber: searchCriteria.ticketNumber,
         storeNumber: searchCriteria.storeNumber,
         authCode: searchCriteria.authCode,
         truckNumber: searchCriteria.truckNumber,
         checkNumber: searchCriteria.checkNumber,
         cardLastFour: searchCriteria.cardLastFour   
      };

      updatedSearchCriteria[key] = value;
      setSearchCriteriatValues(updatedSearchCriteria);
   }

   const validateSearchCriteria = (e) =>{
      e.preventDefault();

      const areAllFieldsEmpty = (
         (searchCriteria.startDate == undefined || searchCriteria.startDate.trim() == '') &&
         (searchCriteria.endDate == undefined || searchCriteria.endDate.trim() == '') &&
         (searchCriteria.ticketNumber == undefined || searchCriteria.ticketNumber.trim() == '') &&
         (searchCriteria.storeNumber == undefined || searchCriteria.storeNumber.trim() == '') &&
         (searchCriteria.authCode == undefined || searchCriteria.authCode.trim() == '') &&
         (searchCriteria.truckNumber == undefined || searchCriteria.truckNumber.trim() == '') &&
         (searchCriteria.checkNumber == undefined || searchCriteria.checkNumber.trim() == '') &&
         (searchCriteria.cardLastFour == undefined || searchCriteria.cardLastFour.trim() == '')
      );

      setValidationMessage(areAllFieldsEmpty ? 'No search critiria provided.' : '');
   }

   return(
      <div id="search-element-container">
         <img src={SearchImage} alt="Receipt Finder" id="recipt-image" />
         <h1>Search</h1>
         <SearchInput 
            label="Start Date"
            value={searchCriteria.startDate}
            searchElement="startDate"
            updateSearchCriteriaHandler={updateSearchCriteria}
         />
         <SearchInput 
            label="End Date"
            value={searchCriteria.endDate}
            searchElement="endDate"
            updateSearchCriteriaHandler={updateSearchCriteria}
         />      
         <SearchInput 
            label="PFJ Store #"
            value={searchCriteria.storeNumber}
            searchElement="storeNumber"
            updateSearchCriteriaHandler={updateSearchCriteria}
         />      
         <SearchInput 
            label="Auth Code"
            placeholder="Last 6 Digits"
            value={searchCriteria.authCode}
            searchElement="authCode"
            updateSearchCriteriaHandler={updateSearchCriteria}
         />
         <SearchInput 
            label="Truck #"
            value={searchCriteria.truckNumber}
            searchElement="truckNumber"
            updateSearchCriteriaHandler={updateSearchCriteria}
         />
         <SearchInput 
            label="Check #"
            value={searchCriteria.checkNumber}
            searchElement="checkNumber"
            updateSearchCriteriaHandler={updateSearchCriteria}
         />
         <SearchInput 
            label="Card #"
            value={searchCriteria.cardLastFour}
            searchElement="cardLastFour"
            updateSearchCriteriaHandler={updateSearchCriteria}
         />
         <div className="clear"></div>
         <br />
         {validationMessage && <div className="validation-message">{validationMessage}</div>}
         <SecondaryButton OnClickEvent={validateSearchCriteria}>Search</SecondaryButton>
      </div>
   );
}

export default Home;
