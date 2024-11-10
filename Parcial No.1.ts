class Producto {
    private codigo: string;
    private nombre: string;
    private precioCosto: number;
    private precioVenta: number;

    constructor(codigo: string, nombre: string, precioCosto: number, precioVenta: number) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precioCosto = precioCosto;
        this.precioVenta = precioVenta;
    }

    public getCodigo(): string {
        return this.codigo;
    }

    public toString(): string {
        return `Código: ${this.codigo}, Nombre: ${this.nombre}, Precio Costo: ${this.precioCosto}, Precio Venta: ${this.precioVenta}`;
    }
}

class NodoProducto {
    producto: Producto;
    next: NodoProducto | null;

    constructor(producto: Producto) {
        this.producto = producto;
        this.next = null;
    }
}

class ListaEnlazadaProductos {
    head: NodoProducto | null;

    constructor() {
        this.head = null;
    }

    public insert(producto: Producto): void {
        const nuevoNodo = new NodoProducto(producto);
        if (this.head === null) {
            this.head = nuevoNodo;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = nuevoNodo;
        }
    }

    public search(codigo: string): Producto | null {
        let current = this.head;
        while (current !== null) {
            if (current.producto.getCodigo() === codigo) {
                return current.producto;
            }
            current = current.next;
        }
        return null;
    }

    public getProductosOrdenados(): Producto[] {
        const productos: Producto[] = [];
        let current = this.head;
        while (current !== null) {
            productos.push(current.producto);
            current = current.next;
        }
        productos.sort((a, b) => a.getCodigo().localeCompare(b.getCodigo()));
        return productos;
    }
}

class HashTableProductos {
    private size: number;
    private data: (ListaEnlazadaProductos | null)[];

    constructor(size: number = 10) {
        this.size = size;
        this.data = new Array(this.size).fill(null);
    }

    private hash(codigo: string): number {
        let hashValue = 0;
        for (let i = 0; i < codigo.length; i++) {
            hashValue += codigo.charCodeAt(i);
        }
        return hashValue % this.size;
    }

    public insertProducto(producto: Producto): void {
        const index: number = this.hash(producto.getCodigo());
        if (this.data[index] === null) {
            this.data[index] = new ListaEnlazadaProductos();
        }
        this.data[index]!.insert(producto);
    }

    public searchProducto(codigo: string): Producto | null {
        const index: number = this.hash(codigo);
        if (this.data[index] !== null) {
            return this.data[index]!.search(codigo);
        }
        return null;
    }

    public printProductos(): void {
        let productCount = 1;

        this.data.forEach(slot => {
            if (slot !== null) {
                const productosOrdenados = slot.getProductosOrdenados();
                productosOrdenados.forEach(producto => {
                    console.log(`Producto No.${productCount}: ${producto.toString()}`);
                    productCount++;
                });
            }
        });
    }
}

let tablaHashProductos = new HashTableProductos();
const productos: Producto[] = [
    new Producto("P001", "Pepto-Bismol", 50.00, 65.00),
    new Producto("P002", "Aspirina", 15.00, 20.00),
    new Producto("P003", "Paracetamol", 10.00, 15.00),
    new Producto("P004", "Ibuprofeno", 30.00, 40.00),
    new Producto("P005", "Omeprazol", 45.00, 60.00),
    new Producto("P006", "Pepto-Bismol", 50.00, 65.00),
    new Producto("P007", "Aspirina", 15.00, 20.00),
    new Producto("P008", "Paracetamol", 10.00, 15.00),
    new Producto("P009", "Ibuprofeno", 30.00, 40.00),
    new Producto("P0010", "Omeprazol", 45.00, 60.00),
    new Producto("P0011", "Ibuprofeno", 30.00, 40.00),
    new Producto("P0012", "Omeprazol", 45.00, 60.00)
];

productos.forEach(producto => {
    tablaHashProductos.insertProducto(producto);
});

tablaHashProductos.printProductos();
