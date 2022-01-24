import { useState } from 'react';

import './styles.scss';

const currentYear = new Date().getFullYear();
const monthsArr = Array.from({ length: 12 }, (_, i) => {
  const month = i + 1;
  return month <= 9 ? `0${month}` : month;
});
const yearsArr = Array.from({ length: 9 }, (_, i) => currentYear + i);

export default function Form({
  cardMonth,
  cardYear,
  onUpdateState,
  cardNumberRef,
  cardHolderRef,
  cardDateRef,
  onCardInputFocus,
  onCardInputBlur,
  cardCvv,
  cardCvvValue,
  children,
}) {
  const [cardNumber, setCardNumber] = useState('');

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    onUpdateState(name, value);
  };

  const onCardNumberChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;
    value = value.replace(/\D/g, '');

    let cardNumber_ = value;
    cardNumber_ = value
      .replace(/(\d{4})/, '$1 ')
      .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
      .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');

    setCardNumber(cardNumber_.trimRight());
    onUpdateState(name, cardNumber_);
  };

  const onCvvChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;

    value = value.replace(/\D/g, '');
    const cardCvvNumber_ = value;
    onUpdateState(name, cardCvvNumber_);
  };

  const onCvvFocus = () => onUpdateState('isCardFlipped', true);

  const onCvvBlur = () => onUpdateState('isCardFlipped', false);

  return (
    <div className="card-form">
      <div className="card-list">{children}</div>
      <div className="card-form__inner">
        <div className="card-input">
          <label htmlFor="cardNumber" className="card-input__label">
            Card Number
          </label>
          <input
            type="tel"
            name="cardNumber"
            className="card-input__input"
            autoComplete="off"
            onChange={onCardNumberChange}
            maxLength="19"
            ref={cardNumberRef}
            onFocus={(e) => onCardInputFocus(e, 'cardNumber')}
            onBlur={onCardInputBlur}
            value={cardNumber}
          />
        </div>

        <div className="card-input">
          <label htmlFor="cardName" className="card-input__label">
            Card Holder
          </label>
          <input
            type="text"
            className="card-input__input"
            autoComplete="off"
            name="cardHolder"
            onChange={handleFormChange}
            ref={cardHolderRef}
            onFocus={(e) => onCardInputFocus(e, 'cardHolder')}
            onBlur={onCardInputBlur}
          />
        </div>

        <div className="card-form__row">
          <div className="card-form__col">
            <div className="card-form__group">
              <label
                htmlFor="cardMonth"
                className="card-input__label"
              >
                Expiration Date
              </label>
              <select
                className="card-input__input -select"
                value={cardMonth}
                name="cardMonth"
                onChange={handleFormChange}
                ref={cardDateRef}
                onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                onBlur={onCardInputBlur}
              >
                <option value="" disabled>
                  Month
                </option>

                {monthsArr.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <select
                name="cardYear"
                className="card-input__input -select"
                value={cardYear}
                onChange={handleFormChange}
                onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                onBlur={onCardInputBlur}
              >
                <option value="" disabled>
                  Year
                </option>

                {yearsArr.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="card-form__col -cvv">
            <div className="card-input">
              <label
                htmlFor="cardCvv"
                className="card-input__label"
              >
                CVV
              </label>
              <input
                type="tel"
                className="card-input__input"
                maxLength="3"
                autoComplete="off"
                name="cardCvv"
                onChange={onCvvChange}
                onFocus={onCvvFocus}
                onBlur={onCvvBlur}
                ref={cardCvv}
                value={cardCvvValue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
