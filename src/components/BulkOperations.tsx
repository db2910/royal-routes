"use client"

import { useState } from "react"
import { Trash2, Download, Check, X } from "lucide-react"

interface BulkOperationsProps {
  selectedItems: string[]
  onBulkDelete: (ids: string[]) => Promise<void>
  onBulkExport?: (ids: string[]) => void
  totalItems: number
  itemName: string
}

export default function BulkOperations({
  selectedItems,
  onBulkDelete,
  onBulkExport,
  totalItems,
  itemName
}: BulkOperationsProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return

    setIsDeleting(true)
    try {
      await onBulkDelete(selectedItems)
      setShowConfirm(false)
    } catch (error) {
      console.error("Bulk delete error:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleBulkExport = () => {
    if (selectedItems.length === 0) return
    onBulkExport?.(selectedItems)
  }

  if (selectedItems.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#B8860B] rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {selectedItems.length} of {totalItems} {itemName} selected
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {onBulkExport && (
              <button
                onClick={handleBulkExport}
                className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                title="Export selected"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            )}

            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
              title="Delete selected"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>

            <button
              onClick={() => window.location.reload()}
              className="flex items-center space-x-1 px-3 py-1.5 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600 transition-colors"
              title="Clear selection"
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Bulk Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {selectedItems.length} selected {itemName}? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 