import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category = { CategoryID: 0, Name: '', Description: '' };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        console.log('Categories loaded:', this.categories);
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      }
    });
  }

  addCategory(form: NgForm) {
    if (form.valid) {
      this.categoryService.createCategory(this.selectedCategory).subscribe(
        category => {
          console.log('Category added:', category);
          form.resetForm();
          (document.getElementById('id02')!).style.display = 'none'; // Close modal after successful addition
          this.loadCategories();
          alert('Thêm thành công.');
        },
        error => {
          alert('Danh mục đã tồn tại.'); // Display an alert to the user on error
          console.error('Failed to add category:', error);
        }
      );
    }
  }
  

  openEditModal(category: Category) {
    this.selectedCategory = { ...category }; 
    (document.getElementById('id01')!).style.display = 'block'; 
  }

  editCategory(form: NgForm) {
    if (form.valid) {
    this.categoryService.updateCategory(this.selectedCategory.CategoryID,this.selectedCategory).subscribe(updatedCategory => {
        console.log('Category updated:', updatedCategory);
       (document.getElementById('id01')!).style.display = 'none'; // Close modal after successful update
       alert('Sửa thành công.');
        this.loadCategories();
      });
    }
   }

  deleteCategory(category: any) {
    const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa '${category.Name}' không?`);
    if (confirmed) {
      this.categoryService.deleteCategory(category.CategoryID).subscribe(
        (response) => {
          console.log('Category deleted successfully:', category);
          this.loadCategories(); 
        },
        error => {
          alert('Không thể xóa vì ràng buộc dữ liệu.');
          console.error('Failed to delete category:', error);
        }
      );
    }
  }
}
