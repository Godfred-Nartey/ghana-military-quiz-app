import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { adminApi } from '../../api/endpoints/admin';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { Category, CreateCategoryRequest } from '../../types';

function ManageCategories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newCategory, setNewCategory] = useState<CreateCategoryRequest>({
    name: '',
    description: '',
    icon: '',
    displayOrder: 0,
  });
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['adminCategories'],
    queryFn: adminApi.getAllCategories,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateCategoryRequest) => adminApi.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCategories'] });
      setIsCreating(false);
      setNewCategory({ name: '', description: '', icon: '', displayOrder: 0 });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Category> }) =>
      adminApi.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCategories'] });
      setEditingCategory(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCategories'] });
      setCategoryToDelete(null);
    },
  });

  const filteredCategories =
    categories?.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleDelete = (category: Category) => setCategoryToDelete(category);
  const confirmDelete = () => {
    if (!categoryToDelete || deleteMutation.isPending) return;
    deleteMutation.mutate(categoryToDelete.id);
  };
  const cancelDelete = () => {
    if (deleteMutation.isPending) return;
    setCategoryToDelete(null);
  };

  const handleUpdate = (category: Category) => {
    updateMutation.mutate({
      id: category.id,
      data: {
        name: category.name,
        description: category.description,
        icon: category.icon,
        displayOrder: category.displayOrder,
        isActive: category.isActive,
      },
    });
  };

  const handleCreate = () => {
    if (newCategory.name.trim()) createMutation.mutate(newCategory);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  const accentColors = [
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-red-500',
    'from-purple-500 to-pink-600',
    'from-cyan-500 to-blue-500',
    'from-yellow-500 to-orange-500',
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 py-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Categories</h1>
        <p className="text-gray-500 mt-1">Create and manage quiz categories</p>
      </motion.div>

      {/* Search + Add */}
      <motion.div variants={itemVariants} className="mb-8 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-sm"
          />
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm flex items-center gap-2"
        >
          <span className="text-lg leading-none">+</span> Add Category
        </button>
      </motion.div>

      {/* Cards Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-400">
            <div className="text-5xl mb-3">📂</div>
            <p className="text-lg font-medium">No categories found</p>
          </div>
        ) : (
          filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
            >
              {/* Color bar top */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${accentColors[index % accentColors.length]}`} />

              <div className="p-5">
                {/* Icon + Name + Status */}
                <div className="flex items-start justify-between mb-3">
                  <div>
  <h3 className="font-semibold text-gray-900 text-base leading-tight">{category.name}</h3>
  <p className="text-xs text-gray-400 mt-0.5">Order: {category.displayOrder}</p>
</div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    category.isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-red-50 text-red-600'
                  }`}>
                    {category.isActive ? '● Active' : '○ Inactive'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px] mb-4">
                  {category.description || <span className="italic text-gray-300">No description</span>}
                </p>

                {/* Stats row */}
                <div className="flex items-center gap-4 py-3 border-t border-gray-50 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800">{category.questionCount || 0}</p>
                    <p className="text-xs text-gray-400">Questions</p>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(category.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-gray-400">Created</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category)}
                    className="flex-1 py-2 rounded-lg bg-red-50 text-red-500 text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={!!categoryToDelete}
        title="Delete Category"
        message={
          <div className="space-y-3">
            <p>Are you sure you want to delete <span className="font-semibold">{categoryToDelete?.name}</span>?</p>
            <p className="text-sm text-red-600">This will also delete all associated questions.</p>
          </div>
        }
        isLoading={deleteMutation.isPending}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-5">Create New Category</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input type="text" required value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Category name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Category description" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <input type="text" value={newCategory.icon}
                    onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="🎯 emoji" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input type="number" value={newCategory.displayOrder}
                    onChange={(e) => setNewCategory({ ...newCategory, displayOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setIsCreating(false); setNewCategory({ name: '', description: '', icon: '', displayOrder: 0 }); }}
                  className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-5">Edit Category</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(editingCategory); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input type="text" required value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <input type="text" value={editingCategory.icon || ''}
                    onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input type="number" value={editingCategory.displayOrder}
                    onChange={(e) => setEditingCategory({ ...editingCategory, displayOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editingCategory.isActive}
                    onChange={(e) => setEditingCategory({ ...editingCategory, isActive: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600" />
                  <span className="text-sm text-gray-700 font-medium">Active</span>
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditingCategory(null)}
                  className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default ManageCategories;