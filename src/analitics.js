import * as $ from 'jquery';

const createAnalitics = () => {
  let counter = 0;
  let finished = false;

  const countClicks = () => counter++;

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

window.analitics = createAnalitics();