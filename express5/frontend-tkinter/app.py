 # app.py
import tkinter as tk
from tkinter import ttk, messagebox
import re
from api import get_all_entries, get_entry_by_id, create_entry, update_entry, delete_entry

class DiaryApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Mi Diario")
        self.root.geometry("800x600")
        
        # Estilo moderno con ttk
        self.style = ttk.Style()
        self.style.configure("TButton", padding=5)
        self.style.configure("TLabel", padding=5)

        # Contenedor principal
        self.main_frame = ttk.Frame(self.root)
        self.main_frame.pack(fill="both", expand=True)

        # Header
        self.header = ttk.Frame(self.main_frame)
        self.header.pack(fill="x", pady=10)
        ttk.Label(self.header, text="Mi Diario", font=("Helvetica", 24)).pack()
        nav_frame = ttk.Frame(self.header)
        nav_frame.pack()
        ttk.Button(nav_frame, text="Inicio", command=self.show_list).pack(side="left", padx=5)
        ttk.Button(nav_frame, text="Nueva Entrada", command=self.show_new).pack(side="left", padx=5)

        # Contenedor para vistas
        self.content_frame = ttk.Frame(self.main_frame)
        self.content_frame.pack(fill="both", expand=True, padx=10, pady=10)

        self.show_list()  # Vista inicial

    def clear_content(self):
        """Limpia el contenido actual para mostrar una nueva vista."""
        for widget in self.content_frame.winfo_children():
            widget.destroy()

    def show_list(self):
        """Muestra la lista de entradas."""
        self.clear_content()
        ttk.Label(self.content_frame, text="Entradas Recientes", font=("Helvetica", 16)).pack(pady=10)

        entries = get_all_entries()
        if not entries:
            ttk.Label(self.content_frame, text="No hay entradas aún. ¡Crea una!").pack()
            return

        for entry in entries:
            frame = ttk.Frame(self.content_frame)
            frame.pack(fill="x", pady=5)
            ttk.Label(frame, text=entry["title"], font=("Helvetica", 12, "bold")).pack(side="left")
            ttk.Label(frame, text=f"Creado: {entry['createdAt']}").pack(side="left", padx=10)
            ttk.Button(frame, text="Ver", command=lambda id=entry["id"]: self.show_view(id)).pack(side="right", padx=5)
            ttk.Button(frame, text="Editar", command=lambda id=entry["id"]: self.show_edit(id)).pack(side="right", padx=5)
            ttk.Button(frame, text="Eliminar", command=lambda id=entry["id"]: self.delete_entry(id)).pack(side="right", padx=5)

    def show_new(self):
        """Muestra el formulario para nueva entrada."""
        self.clear_content()
        ttk.Label(self.content_frame, text="Nueva Entrada", font=("Helvetica", 16)).pack(pady=10)

        # Título
        ttk.Label(self.content_frame, text="Título:").pack(anchor="w")
        title_entry = ttk.Entry(self.content_frame, width=50)
        title_entry.pack(fill="x", pady=5)

        # Contenido (Text con formato)
        ttk.Label(self.content_frame, text="Contenido:").pack(anchor="w")
        content_text = tk.Text(self.content_frame, height=15, width=50)
        content_text.pack(fill="both", expand=True, pady=5)

        # Botones de formato
        format_frame = ttk.Frame(self.content_frame)
        format_frame.pack(fill="x", pady=5)
        ttk.Button(format_frame, text="Negrita", command=lambda: self.apply_format(content_text, "bold")).pack(side="left", padx=5)
        ttk.Button(format_frame, text="Cursiva", command=lambda: self.apply_format(content_text, "italic")).pack(side="left", padx=5)
        ttk.Button(format_frame, text="Color Rojo", command=lambda: self.apply_format(content_text, "red")).pack(side="left", padx=5)

        # Botón Guardar
        ttk.Button(self.content_frame, text="Guardar", command=lambda: self.save_new(title_entry, content_text)).pack(pady=10)

    def show_view(self, id):
        """Muestra una entrada."""
        self.clear_content()
        entry = get_entry_by_id(id)
        if not entry:
            ttk.Label(self.content_frame, text="Entrada no encontrada").pack()
            return

        ttk.Label(self.content_frame, text=entry["title"], font=("Helvetica", 16)).pack(pady=10)
        ttk.Label(self.content_frame, text=f"Creado el: {entry['createdAt']}").pack()
        
        # Mostrar contenido HTML como texto plano (limpiando tags para simplicidad)
        content_text = tk.Text(self.content_frame, height=15, width=50)
        content_text.pack(fill="both", expand=True, pady=5)
        content_text.insert("1.0", self.strip_html(entry["content"]))
        content_text.config(state="disabled")  # Solo lectura

        ttk.Button(self.content_frame, text="Volver", command=self.show_list).pack(pady=10)

    def show_edit(self, id):
        """Muestra el formulario para editar entrada."""
        self.clear_content()
        entry = get_entry_by_id(id)
        if not entry:
            ttk.Label(self.content_frame, text="Entrada no encontrada").pack()
            return

        ttk.Label(self.content_frame, text="Editar Entrada", font=("Helvetica", 16)).pack(pady=10)
        ttk.Label(self.content_frame, text="Título:").pack(anchor="w")
        title_entry = ttk.Entry(self.content_frame, width=50)
        title_entry.insert(0, entry["title"])
        title_entry.pack(fill="x", pady=5)

        ttk.Label(self.content_frame, text="Contenido:").pack(anchor="w")
        content_text = tk.Text(self.content_frame, height=15, width=50)
        content_text.pack(fill="both", expand=True, pady=5)
        content_text.insert("1.0", entry["content"])  # Carga HTML crudo

        format_frame = ttk.Frame(self.content_frame)
        format_frame.pack(fill="x", pady=5)
        ttk.Button(format_frame, text="Negrita", command=lambda: self.apply_format(content_text, "bold")).pack(side="left", padx=5)
        ttk.Button(format_frame, text="Cursiva", command=lambda: self.apply_format(content_text, "italic")).pack(side="left", padx=5)
        ttk.Button(format_frame, text="Color Rojo", command=lambda: self.apply_format(content_text, "red")).pack(side="left", padx=5)

        ttk.Button(self.content_frame, text="Actualizar", command=lambda: self.save_edit(id, title_entry, content_text)).pack(pady=10)

    def apply_format(self, text_widget, format_type):
        """Aplica formato al texto seleccionado."""
        try:
            sel_start, sel_end = text_widget.tag_ranges("sel")
            if not sel_start:
                return
            if format_type == "bold":
                text_widget.tag_add("bold", sel_start, sel_end)
                text_widget.tag_configure("bold", font=("Helvetica", 12, "bold"))
                # Insertar tags HTML
                text_widget.insert(sel_start, "<b>")
                text_widget.insert(sel_end, "</b>")
            elif format_type == "italic":
                text_widget.tag_add("italic", sel_start, sel_end)
                text_widget.tag_configure("italic", font=("Helvetica", 12, "italic"))
                text_widget.insert(sel_start, "<i>")
                text_widget.insert(sel_end, "</i>")
            elif format_type == "red":
                text_widget.tag_add("red", sel_start, sel_end)
                text_widget.tag_configure("red", foreground="red")
                text_widget.insert(sel_start, '<span style="color:red">')
                text_widget.insert(sel_end, "</span>")
        except tk.TclError:
            pass

    def save_new(self, title_entry, content_text):
        """Guarda una nueva entrada."""
        title = title_entry.get().strip()
        content = content_text.get("1.0", "end-1c").strip()
        if not title or not content:
            messagebox.showerror("Error", "Título y contenido son requeridos")
            return
        id = create_entry(title, content)
        if id:
            messagebox.showinfo("Éxito", "Entrada creada")
            self.show_list()
        else:
            messagebox.showerror("Error", "No se pudo crear la entrada")

    def save_edit(self, id, title_entry, content_text):
        """Actualiza una entrada."""
        title = title_entry.get().strip()
        content = content_text.get("1.0", "end-1c").strip()
        if not title or not content:
            messagebox.showerror("Error", "Título y contenido son requeridos")
            return
        if update_entry(id, title, content):
            messagebox.showinfo("Éxito", "Entrada actualizada")
            self.show_list()
        else:
            messagebox.showerror("Error", "No se pudo actualizar la entrada")

    def delete_entry(self, id):
        """Elimina una entrada."""
        if messagebox.askyesno("Confirmar", "¿Seguro que quieres eliminar esta entrada?"):
            if delete_entry(id):
                messagebox.showinfo("Éxito", "Entrada eliminada")
                self.show_list()
            else:
                messagebox.showerror("Error", "No se pudo eliminar la entrada")

    def strip_html(self, html):
        """Limpia tags HTML para mostrar texto plano."""
        return re.sub(r'<[^>]+>', '', html)

if __name__ == "__main__":
    root = tk.Tk()
    app = DiaryApp(root)
    root.mainloop()
