// Функция для изменения позиции вершин геометрии
function modifyPlaneGeomPosAttr(planeGeometry, widthSegments, heightSegments) {
    function check(value, valueCheck) {
        if (!(value instanceof Array) || (value.length !== valueCheck)) {
            return Array(valueCheck).fill(1);
        }
        return value;
    }

    widthSegments = check(widthSegments, planeGeometry.parameters.widthSegments);
    heightSegments = check(heightSegments, planeGeometry.parameters.heightSegments);

    const widthPos = widthSegments.reduce((acc, cur, i) => {
        acc[i + 1] = acc[i] + cur;
        return acc;
    }, Array(widthSegments.length + 1).fill(0)).map((val, _, arr) => val / arr.at(-1));

    const heightPos = heightSegments.reduce((acc, cur, i) => {
        acc[i + 1] = acc[i] + cur;
        return acc;
    }, Array(heightSegments.length + 1).fill(0)).map((val, _, arr) => val / arr.at(-1));

    const pos = planeGeometry.attributes.position.array;
    let i = 0;
    for (const yPos of heightPos) {
        const y = (yPos - 0.5) * planeGeometry.parameters.height;

        for (const xPos of widthPos) {
            const x = (xPos - 0.5) * planeGeometry.parameters.width;

            pos[i++] = x;
            pos[i++] = -y;
            pos[i++] = 0;
        }
    }
}

// Основная часть кода
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
    window.innerWidth / -2, window.innerWidth / 2,
    window.innerHeight / 2, window.innerHeight / -2,
    0.1, 1000
);
camera.position.z = 1;

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
    }
`;

const fragmentShader = `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 pointer;
    varying vec2 vUv;

    vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;
        vec2 uv0 = uv;
        vec3 finalColor = vec3(0.0);
        vec2 gridSize = vec2(6.0, 3.0);
        vec2 gridPos = floor(vUv * gridSize);
        vec2 localUv = fract(vUv * gridSize) - 0.5;
        uv = sin(localUv * 0.5) - pointer;
        float d = length(uv) * exp(-length(uv0));
        vec3 col = palette(length(uv0) + time * 0.4);
        d = sin(d * 8.0 + time) / 8.0;
        d = abs(d);
        d = pow(0.02 / d, 2.0);
        finalColor += col * d;
        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

const uniforms = {
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    pointer: { value: new THREE.Vector2(0, 0) }
};

const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms
});

// Создание и настройка геометрии плоскости
const widthSegments = [17.65, 16.25, 16.32, 16.32, 16.25, 17.15]; // Пропорции ширины
const heightSegments = [1, 1, 1];         // Пропорции высоты
const planeGeometry = new THREE.PlaneGeometry(
    window.innerWidth,
    window.innerHeight,
    widthSegments.length,
    heightSegments.length
);
modifyPlaneGeomPosAttr(planeGeometry, widthSegments, heightSegments);

// Создание меша
const plane = new THREE.Mesh(planeGeometry, material);
scene.add(plane);

// Обновление при изменении размера окна
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.left = width / -2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = height / -2;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    uniforms.resolution.value.set(width, height);

    const newGeometry = new THREE.PlaneGeometry(
        width,
        height,
        widthSegments.length,
        heightSegments.length
    );
    modifyPlaneGeomPosAttr(newGeometry, widthSegments, heightSegments);
    plane.geometry.dispose(); // Удаляем старую геометрию
    plane.geometry = newGeometry;
});

// Анимация
const clock = new THREE.Clock();
function animate() {
    uniforms.time.value += clock.getDelta();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Сглаживание движения указателя
let targetPointer = new THREE.Vector2(0, 0);
window.addEventListener('mousemove', (event) => {
    const pointerX = (event.clientX / window.innerWidth) * 2 - 1;
    const pointerY = -(event.clientY / window.innerHeight) * 2 + 1;
    targetPointer.set(pointerX, pointerY);
});

function smoothPointer() {
    uniforms.pointer.value.lerp(targetPointer, 0.1);
    requestAnimationFrame(smoothPointer);
}

smoothPointer();
