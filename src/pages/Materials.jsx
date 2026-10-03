import { packagingMaterials } from '../data/packagingMaterials'

export default function Materials() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-semibold text-slate-900">Packaging Materials</h1>
      <p className="mt-2 text-sm text-slate-500">
        Sample dataset used by this prototype. Values are illustrative, not laboratory results.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {packagingMaterials.map((material) => (
          <article
            key={material.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <h2 className="text-lg font-semibold text-slate-900">{material.name}</h2>
            <p className="text-sm text-slate-500">{material.fullName}</p>
            <p className="mt-3 text-sm text-slate-700">{material.summary}</p>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div>
                <dt className="font-medium text-slate-500">OTR</dt>
                <dd>{material.otr}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">WVTR</dt>
                <dd>{material.wvtr}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  )
}
