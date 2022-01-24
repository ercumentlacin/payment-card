import {
  useState, useRef, useCallback, useEffect,
} from 'react';

import './app.scss';
import Button from './components/Button';

import Card from './components/Card';
import Form from './components/Form';
import Modal from './components/Modal';
import { validation } from './helpers/validation';
import { paymentRequests } from './services';

const initialState = {
  cardNumber: '#### #### #### ####',
  cardHolder: 'FULL NAME',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
  isCardFlipped: false,
  showModal: false,
  modalText: '',
  modalType: '',
};

export default function App() {
  const [state, setState] = useState(initialState);
  const [currentFocusedElm, setCurrentFocusedElm] = useState(null);

  const updateStateValues = useCallback(
    (keyName, value) => {
      setState((prev) => ({
        ...prev,
        [keyName]: value || initialState[keyName],
      }));
    },
    [],
  );

  const modalRef = useRef(null);

  const formFieldsRefObj = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
    cardCvv: useRef(),
  };

  const focusFormFieldByKey = useCallback((key) => {
    formFieldsRefObj[key].current.focus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardElementsRef = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
  };

  const onCardFormInputFocus = (_event, inputName) => {
    const refByName = cardElementsRef[inputName];
    setCurrentFocusedElm(refByName);
  };

  const onCardInputBlur = useCallback(() => setCurrentFocusedElm(null), []);

  const onSwitchBtnClick = () => updateStateValues('isCardFlipped', !state.isCardFlipped);

  const closeModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showModal: false,
    }));
    modalRef.current?.classList.remove('on');
  }, []);

  const onPaymentClick = async () => {
    const allFields = {
      cardNumber: { name: 'cardNumber', value: state.cardNumber },
      cardHolder: { name: 'cardHolder', value: state.cardHolder },
      cardMonth: { name: 'cardMonth', value: state.cardMonth },
      cardYear: { name: 'cardYear', value: state.cardYear },
      cardCvv: { name: 'cardCvv', value: state.cardCvv },
    };

    const hasFieldsFill = validation(allFields);

    if (hasFieldsFill) {
      modalRef.current?.classList.add('on');
      return setState((prev) => ({
        ...prev,
        showModal: true,
        modalText: 'All fields are required to fill and card number must be 16 digits',
        modalType: 'error',
      }));
    }

    const request = await paymentRequests.check();
    if (!request.data) {
      return null;
    }

    const numberIsExist = request.data.some((item) => item.number === state.cardNumber.replace(/\s+/g, ''));
    if (numberIsExist) {
      modalRef.current?.classList.add('on');
      return setState((prev) => ({
        ...prev,
        showModal: true,
        modalText: 'Payment is successful',
        modalType: 'success',
      }));
    }
    modalRef.current?.classList.add('on');
    return setState((prev) => ({
      ...prev,
      showModal: true,
      modalText: 'Payment is failed',
      modalType: 'error',
    }));
  };

  useEffect(() => {
    const id = setTimeout(() => {
      modalRef.current?.classList.remove('on');
      setState((prev) => ({
        ...prev,
        showModal: false,
      }));
    }, 3000);
    return () => clearTimeout(id);
  }, [state.showModal]);

  return (
    <div className="wrapper">
      <Form
        cardCvvValue={state.cardCvv}
        cardDateRef={formFieldsRefObj.cardDate}
        cardHolderRef={formFieldsRefObj.cardHolder}
        cardMonth={state.cardMonth}
        cardNumberRef={formFieldsRefObj.cardNumber}
        cardYear={state.cardYear}
        onCardInputBlur={onCardInputBlur}
        onCardInputFocus={onCardFormInputFocus}
        onUpdateState={updateStateValues}
      >
        <Card
          cardCvv={state.cardCvv}
          cardDateRef={cardElementsRef.cardDate}
          cardHolder={state.cardHolder}
          cardHolderRef={cardElementsRef.cardHolder}
          cardMonth={state.cardMonth}
          cardNumber={state.cardNumber}
          cardNumberRef={cardElementsRef.cardNumber}
          cardYear={state.cardYear}
          currentFocusedElm={currentFocusedElm}
          isCardFlipped={state.isCardFlipped}
          onCardElementClick={focusFormFieldByKey}
        />
      </Form>

      <div className="btn-groub">
        <Button handleClick={onSwitchBtnClick}>
          Switch
        </Button>
        <Button handleClick={onPaymentClick}>
          Pay Now
        </Button>
      </div>

      <Modal type={state.modalType} modalRef={modalRef} closeModal={closeModal}>
        {state.modalText}
      </Modal>

    </div>
  );
}
