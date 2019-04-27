const [testBtn, showDom] = [
  document.getElementById('test'),
  document.getElementById('show')
];
const showContent = () => {
  showDom.innerText = 'Should show content!';
};

const hiddenContent = () => {
  showDom.innerText = '';
};
let showObj = {
  show: false,
};
let show = false;
testBtn.addEventListener('click', () => {
  showObj.show = !show;
}, true);

Object.defineProperty(showObj, "show", {
  get: function() {
    return show;
  },
  set: function(newValue) {
    console.log(newValue);
    show = newValue;
    if (newValue) {
      showContent();
    } else {
      hiddenContent();
    }
  }
});