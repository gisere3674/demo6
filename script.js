const presets = {
  candy: { bg: '#100f2e', accent: '#ff4ecd', one: '#7c5cff', two: '#00d4ff' },
  ocean: { bg: '#06283d', accent: '#47f5d1', one: '#1363df', two: '#dff6ff' },
  sunset: { bg: '#2d132c', accent: '#ffb000', one: '#ff5f6d', two: '#ffc371' },
  forest: { bg: '#071f1a', accent: '#b6ff40', one: '#00c896', two: '#2fefbd' },
};

const controls = {
  title: document.querySelector('#diagramTitle'),
  preset: document.querySelector('#themePreset'),
  background: document.querySelector('#backgroundColor'),
  accent: document.querySelector('#accentColor'),
  nodeOne: document.querySelector('#nodeOneColor'),
  nodeTwo: document.querySelector('#nodeTwoColor'),
  steps: document.querySelector('#steps'),
};

const previewTitle = document.querySelector('#titlePreview');
const diagram = document.querySelector('#diagram');

function setTheme({ bg, accent, one, two }) {
  document.documentElement.style.setProperty('--bg', bg);
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.style.setProperty('--node-one', one);
  document.documentElement.style.setProperty('--node-two', two);
}

function syncColorInputs(theme) {
  controls.background.value = theme.bg;
  controls.accent.value = theme.accent;
  controls.nodeOne.value = theme.one;
  controls.nodeTwo.value = theme.two;
}

function renderDiagram() {
  previewTitle.textContent = controls.title.value || 'Untitled diagram';
  const steps = controls.steps.value
    .split('\n')
    .map((step) => step.trim())
    .filter(Boolean);

  diagram.replaceChildren(...steps.map((step, index) => {
    const node = document.createElement('article');
    node.className = 'node';
    node.role = 'listitem';
    node.style.animationDelay = `${index * 70}ms`;

    const number = document.createElement('div');
    number.className = 'node-number';
    number.textContent = String(index + 1).padStart(2, '0');

    const icon = document.createElement('div');
    icon.className = 'node-icon';
    icon.setAttribute('aria-hidden', 'true');

    const heading = document.createElement('h3');
    heading.textContent = step;

    node.append(number, icon, heading);
    return node;
  }));
}

controls.preset.addEventListener('change', (event) => {
  const theme = presets[event.target.value];
  syncColorInputs(theme);
  setTheme(theme);
});

[controls.background, controls.accent, controls.nodeOne, controls.nodeTwo].forEach((input) => {
  input.addEventListener('input', () => setTheme({
    bg: controls.background.value,
    accent: controls.accent.value,
    one: controls.nodeOne.value,
    two: controls.nodeTwo.value,
  }));
});

[controls.title, controls.steps].forEach((input) => input.addEventListener('input', renderDiagram));

syncColorInputs(presets.candy);
setTheme(presets.candy);
renderDiagram();
