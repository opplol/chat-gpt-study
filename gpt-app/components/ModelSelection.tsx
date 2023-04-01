'use client'
import useSwr from 'swr'
import Select from 'react-select'

const fetchModels = () => fetch('/api/getEngines').then((res) => res.json())

function ModelSelection() {
  const { data: models, isLoading } = useSwr('models', fetchModels)
  const { data: model, mutate: setModel } = useSwr('model', {
    fallbackData: 'gpt-3.5-turbo',
  })

  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{ control: (state) => 'bg-[#434654] border-[#434654]' }}
        onChange={(selected) => setModel(selected.value)}
      />
    </div>
  )
}

export default ModelSelection
