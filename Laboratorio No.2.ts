class Task {
    constructor(
        public name: string,
        public priority: number,
        public completed: boolean = false // Nuevo campo para marcar tareas completadas
    ) {}
}

class MinHeap {
    private heap: Task[];
    private n: number;

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    // Método para insertar una tarea.
    public insert(task: Task): void {
        if (this.n == this.heap.length - 1) {
            this.resize(2 * this.heap.length);
        }
        this.n++;
        this.heap[this.n] = task;
        this.bubbleUp(this.n);
    }

    // Método para ordenar las tareas hacia arriba.
    private bubbleUp(i: number): void {
        let parent: number = Math.floor(i / 2);
        while (i > 1 && this.heap[parent].priority > this.heap[i].priority) {
            this.swap(i, parent);
            i = parent;
            parent = Math.floor(i / 2);
        }
    }

    // Método para intercambiar dos elementos en el heap.
    private swap(i: number, j: number): void {
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    // Método para redimensionar el heap.
    private resize(newSize: number): void {
        let newHeap: Task[] = new Array(newSize);
        for (let i = 1; i <= this.n; i++) {
            newHeap[i] = this.heap[i];
        }
        this.heap = newHeap;
    }

    // Método para obtener la tarea con la menor prioridad.
    public getMin(): Task {
        let min = this.heap[1];
        this.heap[1] = this.heap[this.n];
        this.heap[this.n] = null!;
        this.n--;
        this.sink(1);
        return min;
    }

    // Método para reorganizar el heap después de eliminar el mínimo.
    private sink(i: number): void {
        while (2 * i <= this.n) {
            let j = 2 * i;
            if (j < this.n && this.heap[j].priority > this.heap[j + 1].priority) {
                j++;
            }
            if (this.heap[i].priority <= this.heap[j].priority) {
                break;
            }
            this.swap(i, j);
            i = j;
        }
    }

    // Método para mostrar todas las tareas.
    public print(): void {
        let tree: string = "";
        for (let i = 1; i <= this.n; i++) {
            tree += `[${this.heap[i].name} - Prioridad: ${this.heap[i].priority}] `;
        }
        console.log(tree);
    }

    // Método para obtener la cantidad de tareas.
    public getQuantity(): number {
        return this.n;
    }

    // Método para verificar si el heap está vacío.
    public isEmpty(): boolean {
        return this.n === 0;
    }
}

// Main
let myMinHeap: MinHeap = new MinHeap(7);

// Tareas por defecto
let tasks = [
    new Task("Calificar Laboratorio 1", 1),
    new Task("Reunirse con Facultad de Ingeniería", 1),
    new Task("Calificar Laboratorio 2", 4),
    new Task("Preparar la Siguiente Clase", 2),
    new Task("Definir Laboratorio 3", 3),
    new Task("Inscribirse a Capacitación General", 1)
];

// Insertar tareas en el heap
tasks.forEach(task => myMinHeap.insert(task));

// Apartado 1: Tareas con más prioridad (las de menor valor de prioridad)
console.log("\n\nTAREAS CON MÁS PRIORIDAD:");
let completedTasks: Task[] = [];
while (!myMinHeap.isEmpty()) {
    let task = myMinHeap.getMin();
    console.log(`${task.name} - Prioridad: ${task.priority}`);
    task.completed = true; // Marcar tarea como completada
    completedTasks.push(task); // Guardar tarea completada
}

// Apartado 2: Tareas con menos prioridad (las de mayor valor de prioridad)
let remainingTasks: Task[] = [];
let remainingHeap = new MinHeap(7);
tasks.forEach(task => remainingHeap.insert(task));

// Llenamos el array de tareas restantes y las imprimimos
console.log("\n\nTAREAS CON MENOS PRIORIDAD:");
while (!remainingHeap.isEmpty()) {
    let task = remainingHeap.getMin();
    remainingTasks.push(task);
}
remainingTasks.reverse();  // Invertimos el array para que las de mayor prioridad (número) se impriman al final
remainingTasks.forEach(task => {
    console.log(`${task.name} - Prioridad: ${task.priority}`);
});

// Apartado 3: Tareas restantes pendientes
console.log("\n\nTAREAS RESTANTES PENDIENTES:");
remainingTasks.forEach(task => {
    console.log(`${task.name} - Prioridad: ${task.priority}`);
});

// Apartado 4: Tareas Completadas
console.log("\n\nTAREAS COMPLETADAS:");
completedTasks.forEach(task => {
    console.log(`${task.name} - Prioridad: ${task.priority}`);
});
