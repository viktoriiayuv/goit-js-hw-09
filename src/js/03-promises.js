import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelayEl = document.querySelector('input[name="delay"]');
const delayStepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  let delay = Number(firstDelayEl.value);
  const step = Number(delayStepEl.value);
  const amount = Number(amountEl.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
        );
      })
      .catch(({ position, delay }) => {
        console.log(
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
        );
      });
    delay += step;
  }
}
