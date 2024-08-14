
import { useBlocker } from 'react-router-dom'
import { Modal , Button} from 'antd';
import { useRef  } from 'react';

const  useCustomPrompt = ({ title, content }, shouldPrompt) => {
    const retryFn = useRef(() => {});
  
    const handleBlockNavigation = ({ retry }) => {
      const shouldDisplayPrompt =
        typeof shouldPrompt === 'boolean' ? shouldPrompt : shouldPrompt();
  
      if (shouldDisplayPrompt) {
        Modal.confirm({
          title: 'some title',
          content: 'this is the contnet',
          onOk() {
            retry();
          },
          onCancel() {},
        });
      } else {
        retry();
      }
    };
  
    useBlocker(handleBlockNavigation, shouldPrompt);
  };
  
export default useCustomPrompt;