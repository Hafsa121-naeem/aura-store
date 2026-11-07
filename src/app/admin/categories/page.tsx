'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import { FALLBACK_CATEGORIES } from '@/lib/data/fallback-data';
import { Category } from '@/lib/types/database';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(FALLBACK_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  });

  const openNewModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      description: cat.description || '',
      imageUrl: cat.image_url || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category from PostgreSQL?')) {
      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? {
                ...c,
                name: formData.name,
                description: formData.description,
                image_url: formData.imageUrl,
              }
            : c
        )
      );
    } else {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const newCat: Category = {
        id: `c-${Date.now()}`,
        name: formData.name,
        slug,
        description: formData.description,
        image_url: formData.imageUrl,
        display_order: categories.length + 1,
        created_at: new Date().toISOString(),
      };
      setCategories([...categories, newCat]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdminGuard>
        <AdminHeader />

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Product Categories
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Organize catalog taxonomies and homepage showcase banners.
              </p>
            </div>

            <button
              type="button"
              onClick={openNewModal}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs flex flex-col justify-between"
              >
                <div className="relative h-36 bg-slate-100">
                  <Image
                    src={cat.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-bold text-base">{cat.name}</h3>
                    <p className="text-[11px] text-slate-300 font-mono">slug: {cat.slug}</p>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {cat.description || 'No description provided.'}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-400 font-semibold">Order: #{cat.display_order}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(cat.id)}
                        className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-100"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-base font-bold text-slate-900">
                  {editingCategory ? 'Edit Category' : 'Create Category'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Acoustic Monitors"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of products in this category..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2 rounded-xl text-xs shadow-sm"
                  >
                    {editingCategory ? 'Save Changes' : 'Create Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AdminGuard>
    </div>
  );
}
