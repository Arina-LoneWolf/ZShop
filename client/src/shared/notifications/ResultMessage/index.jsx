import './ResultMessage.scss';
import React from 'react';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { resultMessageState, messageContent } from '../recoil/resultMessageState';

function ResultMessage() {
  // const [resultMsg, setResultMsg] = useRecoilState(resultMessageState);
  // const content = useRecoilValue(messageContent);

  // const closeMessage = () => {
  //   if (resultMsg.func) resultMsg.func();
  //   setResultMsg({ ...resultMsg, show: false, func: () => {} });
  // }

  return (
    <React.Fragment>
      {/* {resultMsg.show && <div className="result-message">
        <div id="overlay"></div>
        <div className="result-message-container">
          <img src={content.image} className="result-image" alt="" />
          <div className="result-title">{content.title}</div>
          <div className="result-description">{resultMsg.message}</div>
          <div className="accept-btn" onClick={closeMessage}>{content.acceptButtonName}</div>
        </div>
      </div>} */}
    </React.Fragment>
  );
}

export default ResultMessage;
