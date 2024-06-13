export default function Title({ name, page, lang }) {
    return (
        <div className="text-white">
            <h1 className="text-4xl font-bold mb-4 text-left">Nama: {name}</h1>
            <p className="text-lg mb-2 text-left">Page: {page}</p>
            <p className="text-lg text-left">Language: {lang}</p>
        </div>
    );
}
