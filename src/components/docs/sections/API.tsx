import { FC } from "react";

const API: FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4">API Reference</h2>
            <p className="text-white/70 mb-2">
                Complete reference for the API, SDKs, endpoints, and examples.
            </p>
            <ul className="list-disc list-inside text-white/70">
                <li>Python SDK</li>
                <li>JavaScript SDK</li>
                <li>REST API Endpoints</li>
            </ul>
        </div>
    );
};

export default API;
