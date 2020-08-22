import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PageController from '../../controllers/PageController';
import requestReceipts from '../../api/requestReceipts';
import ReceiptImage from '../../assets/images/receipt_finder_logo_1@4x.png';
import Eye from '../../assets/icons/Eye';
import Download from '../../assets/icons/Download';
import Checkbox from '../../components/Common/Checkbox';

import displayError from '../../util/displayError';
import devlog from '../../util/devlog';
import noop from '../../util/noop';
import config from '../../config';

import './style.scss';
import PrimaryButton from '../../components/PrimaryButton';

const ReceiptListItem = ({ receipt = {}, toggleSelected = noop, selected = false }) => {

  const handleCheckboxChange = v => toggleSelected(v);
  
  return (
    <tr className={selected ? 'receipt-selected' : ''}>
      <td className="td-checkbox">
        <Checkbox checked={selected} onChange={handleCheckboxChange} />
      </td>
      <td>{receipt.date}</td>
      <td>{receipt.storeNumber}</td>
      <td>{receipt.authCode}</td>
      <td>{receipt.truckNumber}</td>
      <td>{receipt.checkNumber}</td>
      <td>{receipt.cardNumber}</td>
      <td><Eye /></td>
      <td><Download /></td>
    </tr>
  )
}

const ReceiptFinder = () => {
  
  const [receipts, setReceipts] = useState(null);

  const { sessionToken } = useSelector(({ app }) => app);

  useEffect(() => { document.title = 'Pilot | Receipt Finder' }, []);

  useEffect(() => {
    if (!receipts && sessionToken) {
      requestReceipts(sessionToken)
        .then(res => {
          if (res.statusCode === 200) {
            setReceipts(res.receipts.map(v => ({ ...v, selected: false })));
          } else {
            displayError(res.userMessage || 'Failed to get receipts.');

            if (res.statusCode === 403) {
              sessionStorage.removeItem(config["storage-key"]);
            }
            
          }
        })
        .catch(err => {
          devlog(err);
          displayError('Unknown error, please try again.');
        });
    }
  }, [sessionToken]);

  const toggleReceiptAtIndex = (i, checked) => {
    const oldReceipts = [ ...receipts ];
    oldReceipts[i].selected = checked;
    setReceipts(oldReceipts);
  }
  
  return (
    <PageController>
      <div className="receipt-page">
        <div className="receipt-page__subheader">
          <a href="#">{'<'} BACK</a>
          {
            receipts?.some(f => f.selected)
              ? (
                <PrimaryButton className="receipt-page__download-selected-btn">
                  <Download />
                  Download Selected ({receipts.filter(f => f.selected).length})
                </PrimaryButton>
              ) : null
          }
        </div>
        <div className="receipt-table-container">
          <img src={ReceiptImage} alt="Receipt Finder" className="receipt-finder-logo" />
          <h2>Search Results</h2>
          <table className="receipt-table">
            <thead>
              <tr>
                <th className="th-checkbox"></th>
                <th>Date</th>
                <th>PFJ Store #</th>
                <th>Auth Code</th>
                <th>Truck #</th>
                <th>Check #</th>
                <th>Card #</th>
                <th>View</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {
                receipts ? (
                  receipts.length > 0
                    ? (
                      receipts.map((v, i) => (
                        <ReceiptListItem
                          key={`receipt-view-${i}`}
                          receipt={{
                            ...v,
                            index: i,
                          }}
                          selected={v.selected}
                          toggleSelected={checked => toggleReceiptAtIndex(i, checked)}
                        />
                      ))
                    ) : <tr><td>'No receipts found...'</td></tr>
                ) : <tr><td>'Getting receipts ...'</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </PageController>
  )
}

export default ReceiptFinder;
