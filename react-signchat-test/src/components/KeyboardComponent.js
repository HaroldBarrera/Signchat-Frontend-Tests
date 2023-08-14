import { useEffect, useState } from "react";

const KeyboardComponent = () => {

    const [keyboardHtml, setKeyboardHtml] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/keyboard')
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Error al obtener el teclado');
                }
            })
            .then(data => {
                // Reemplaza las rutas de las imágenes directas con las rutas de getImage
                data = data.replace(
                    /src="\/static\/keyboard\/sc_(\w)\.png"/g,
                    'src="http://localhost:8080/images/sc_$1.png"'
                );
                setKeyboardHtml(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_1.png" alt="1" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_2.png" alt="2" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_3.png" alt="3" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_4.png" alt="4" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_5.png" alt="5" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_6.png" alt="6" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_7.png" alt="7" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_8.png" alt="8" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_9.png" alt="9" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_0.png" alt="0" />
            </button>
            <br />
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_q.png" alt="q" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_w.png" alt="w" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_e.png" alt="e" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_r.png" alt="r" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_t.png" alt="t" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_y.png" alt="y" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_u.png" alt="i" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_o.png" alt="o" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_p.png" alt="p" />
            </button>
            <br />
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_a.png" alt="a" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_s.png" alt="s" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_d.png" alt="d" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_f.png" alt="f" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_g.png" alt="g" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_h.png" alt="h" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_j.png" alt="j" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_k.png" alt="k" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_l.png" alt="l" />
            </button>
            <br />
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_z.png" alt="z" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_x.png" alt="x" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_c.png" alt="c" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_v.png" alt="v" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_b.png" alt="b" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_n.png" alt="n" />
            </button>
            <button className="key-button">
                <img src="http://localhost:8080/images/sc_m.png" alt="m" />
            </button>
            <br />
            {/* <div dangerouslySetInnerHTML={{ __html: keyboardHtml }} /> */}
        </>
    );
}

export default KeyboardComponent;