import * as $ from 'jquery';

const createAnalitics = (): object => {
  let counter = 0;
  let finished: boolean = false;

  const countClicks = (): number => counter++;

  $(document).on('click', countClicks);

  return {
    destroy() {
      $(document).off('click', countClicks);
      finished = true;
    },
    
    getClicks (){
      if (finished) {
        return 'Analitics has finished.';
      }
      return counter;
    }
  }
}

window['analitics'] = createAnalitics();