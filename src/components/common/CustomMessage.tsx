/* eslint-disable no-lone-blocks */
import './CustomMessage.scss';
import checked from './image/checked.png';
import cancel from './image/cancel.png';
// import congrats from './image/congrats.gif';

type CustomMessageType = {
  duration?: string;
  type: 'success' | 'error';
  content?: string;
};
{
  /* <img class="congrats" src=${congrats} alt="gif" /> */
}
export const CustomMessage = ({
  type,
  content,
  duration,
}: CustomMessageType) => {
  const fullComponent = `
    <div id='custom_massage_id' class=custom_message_wrapper ${
      type === 'success' ? 'success' : type === 'error' ? 'error' : ''
    }>
        <div class="custom_message">
        <div class="custom_message_content">
          <div class="imgbox">
            <img src=${
              type === 'success' ? checked : type === 'error' ? cancel : ''
            } alt="" class="img" />
          </div>
          <div class="title">
            <h3>${
              type === 'success' ? 'Success!' : type === 'error' ? 'Error!' : ''
            }</h3>
          </div>
          <p class="para">
            ${
              content
                ? content
                : type === 'success'
                ? 'Your process has been complete successfully'
                : type === 'error'
                ? 'Your process has been failed'
                : ''
            }
          </p>
          <button class="message_submit_btn" type="button">
            <Span id='count'>${duration ? duration : 2}</Span>
          </button>
          

        </div>
        <div class="progress_bar"></div>
         </div>
     </div>
`;

  const root = document?.getElementById('root');
  // Appending Component
  root?.insertAdjacentHTML('beforeend', fullComponent);

  const timmer = setInterval(() => {
    const message = document?.getElementById('custom_massage_id');
    const count = message?.querySelector('#count');
    if (count) {
      const countNumber = Number(count?.textContent);
      if (countNumber === 1) {
        clearInterval(timmer);
        return message?.remove();
      }
      const value = String(Number(count?.textContent) - 1);
      count.textContent = value;
    }
  }, 1000);
};
