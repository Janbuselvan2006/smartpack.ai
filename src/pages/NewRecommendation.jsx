import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Field, { Input, Select } from '../components/Field'
import { useApp } from '../context/AppContext'

const categories = [
  'Fresh Produce',
  'Meat & Seafood',
  'Dairy',
  'Bakery',
  'Processed Foods',
  'Oils & Fats',
  'Beverages',
  'Grains',
]

export default function NewRecommendation() {
  const { draft, setDraft } = useApp()
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const update = (key, value) => setDraft({ ...draft, [key]: value })

  const goNext = () => {
    if (step === 1) {
      if (!draft.foodName || !draft.moistureContent || !draft.pH || !draft.oilFatContent) {
        setError('Please complete the food details before continuing.')
        return
      }
      setError('')
      setStep(2)
      return
    }

    if (
      !draft.shelfLifeDays ||
      !draft.storageTemp ||
      !draft.relativeHumidity ||
      !draft.transportationCondition
    ) {
      setError('Please complete the storage details before analyzing.')
      return
    }
    navigate('/app/analyzing')
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm font-medium text-green-700">New recommendation</p>
      <h1 className="mt-1 text-2xl font-semibold text-slate-900">
        Food & Storage Details
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Step {step} of 2 · {step === 1 ? 'Food details' : 'Storage details'}
      </p>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-green-600 transition-all"
          style={{ width: step === 1 ? '50%' : '100%' }}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        {step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Food / Commodity Name">
                <Input
                  value={draft.foodName}
                  onChange={(e) => update('foodName', e.target.value)}
                  placeholder="e.g. Tomato"
                />
              </Field>
            </div>
            <Field label="Food Category">
              <Select
                value={draft.foodCategory}
                onChange={(e) => update('foodCategory', e.target.value)}
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </Field>
            <Field label="Moisture Content" hint="% wet basis">
              <Input
                type="number"
                min="0"
                max="100"
                value={draft.moistureContent}
                onChange={(e) => update('moistureContent', e.target.value)}
                placeholder="e.g. 94"
              />
            </Field>
            <Field label="pH">
              <Input
                type="number"
                step="0.1"
                min="0"
                max="14"
                value={draft.pH}
                onChange={(e) => update('pH', e.target.value)}
                placeholder="e.g. 4.3"
              />
            </Field>
            <Field label="Oil / Fat Content" hint="%">
              <Input
                type="number"
                min="0"
                value={draft.oilFatContent}
                onChange={(e) => update('oilFatContent', e.target.value)}
                placeholder="e.g. 0.2"
              />
            </Field>
            {(draft.foodCategory === 'Fresh Produce' ||
              draft.foodCategory === 'Meat & Seafood') && (
              <div className="sm:col-span-2">
                <Field label="Respiration Rate" hint="If applicable">
                  <Select
                    value={draft.respirationRate}
                    onChange={(e) => update('respirationRate', e.target.value)}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                    <option>Not applicable</option>
                  </Select>
                </Field>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Required Shelf Life" hint="Days">
              <Input
                type="number"
                min="1"
                value={draft.shelfLifeDays}
                onChange={(e) => update('shelfLifeDays', e.target.value)}
                placeholder="e.g. 10"
              />
            </Field>
            <Field label="Storage Temperature" hint="°C">
              <Input
                type="number"
                value={draft.storageTemp}
                onChange={(e) => update('storageTemp', e.target.value)}
                placeholder="e.g. 8"
              />
            </Field>
            <Field label="Relative Humidity" hint="%">
              <Input
                type="number"
                min="0"
                max="100"
                value={draft.relativeHumidity}
                onChange={(e) => update('relativeHumidity', e.target.value)}
                placeholder="e.g. 90"
              />
            </Field>
            <Field label="Storage Type">
              <Select
                value={draft.storageType}
                onChange={(e) => update('storageType', e.target.value)}
              >
                <option>Ambient</option>
                <option>Chilled</option>
                <option>Frozen</option>
              </Select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Transportation Condition">
                <Input
                  value={draft.transportationCondition}
                  onChange={(e) => update('transportationCondition', e.target.value)}
                  placeholder="e.g. Refrigerated truck"
                />
              </Field>
            </div>
          </div>
        )}

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <div className="mt-6 flex justify-between">
          <Button
            variant="secondary"
            onClick={() => {
              setError('')
              if (step === 1) navigate('/app')
              else setStep(1)
            }}
          >
            Back
          </Button>
          <Button onClick={goNext}>{step === 1 ? 'Next →' : 'Analyze'}</Button>
        </div>
      </div>
    </div>
  )
}
