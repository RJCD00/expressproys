 
# api.py
import requests
import os
from dotenv import load_dotenv

load_dotenv()

BACKEND_URL = os.getenv('BACKEND_URL')

def get_all_entries():
    try:
        response = requests.get(f"{BACKEND_URL}/api/entries")
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error al obtener entradas: {e}")
        return []

def get_entry_by_id(id):
    try:
        response = requests.get(f"{BACKEND_URL}/api/entries/{id}")
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error al obtener entrada {id}: {e}")
        return None

def create_entry(title, content):
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/entries",
            json={"title": title, "content": content}
        )
        response.raise_for_status()
        return response.json().get("id")
    except requests.RequestException as e:
        print(f"Error al crear entrada: {e}")
        return None

def update_entry(id, title, content):
    try:
        response = requests.put(
            f"{BACKEND_URL}/api/entries/{id}",
            json={"title": title, "content": content}
        )
        response.raise_for_status()
        return True
    except requests.RequestException as e:
        print(f"Error al actualizar entrada {id}: {e}")
        return False

def delete_entry(id):
    try:
        response = requests.delete(f"{BACKEND_URL}/api/entries/{id}")
        response.raise_for_status()
        return True
    except requests.RequestException as e:
        print(f"Error al eliminar entrada {id}: {e}")
        return False