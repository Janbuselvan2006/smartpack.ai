import { getMaterialById, packagingMaterials } from '../data/packagingMaterials'

const prototypeNote =
  'Prototype guidance based on sample data. Validate packaging choices with a qualified specialist.'

export function buildRecommendation(input) {
  const moisture = Number(input.moistureContent) || 0
  const oilFat = Number(input.oilFatContent) || 0
  const shelfLife = Number(input.shelfLifeDays) || 0
  const isFreshProduce = input.foodCategory === 'Fresh Produce'
  const materialId = chooseMaterial({
    input,
    moisture,
    oilFat,
    shelfLife,
    isFreshProduce,
  })
  const recommended = getMaterialById(materialId)
  const alternatives = packagingMaterials
    .filter((material) => material.id !== materialId)
    .slice(0, 3)
    .map((material) => ({
      label: 'Alternative',
      material,
      note: material.summary,
    }))

  return {
    id: `recommendation-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    input: { ...input },
    recommended: {
      ...recommended,
      why: explainChoice(materialId, input),
    },
    alternatives,
    prototypeNote,
  }
}

export async function analyzeRecommendation(input) {
  return buildRecommendation(input)
}

function chooseMaterial({ input, moisture, oilFat, shelfLife, isFreshProduce }) {
  if (input.storageType === 'Frozen') return 'hdpe'
  if (isFreshProduce && input.respirationRate !== 'Not applicable') {
    return 'breathable'
  }
  if (oilFat >= 10 || input.foodCategory === 'Oils & Fats') return 'metallized'
  if (shelfLife >= 90 || (moisture >= 70 && shelfLife >= 30)) {
    return 'alu-laminate'
  }
  if (input.storageType === 'Chilled' || input.foodCategory === 'Meat & Seafood') {
    return 'pet'
  }
  if (input.foodCategory === 'Bakery' || moisture < 30) return 'ldpe'
  return 'biofilm'
}

function explainChoice(materialId, input) {
  if (materialId === 'breathable') {
    return 'Controlled gas exchange helps meet the respiration needs of fresh produce.'
  }
  if (materialId === 'hdpe') {
    return 'Moisture resistance and mechanical strength suit frozen storage and handling.'
  }
  if (materialId === 'metallized') {
    return 'Improved oxygen, moisture, and light barriers help protect oil- and fat-rich foods.'
  }
  if (materialId === 'alu-laminate') {
    return 'A near-complete barrier supports products with a long target shelf life.'
  }
  if (materialId === 'pet') {
    return 'A strong material with useful gas barrier properties suits chilled applications.'
  }
  if (materialId === 'ldpe') {
    return 'Flexible film suits shorter-life products with modest barrier requirements.'
  }
  return `A lower-impact film may suit this ${input.foodCategory.toLowerCase()} application with a shorter shelf life.`
}