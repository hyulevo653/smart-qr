import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TemplateState {
    qrBgColor: string;
    qrColor: string;
    logoImage?: string;
}

interface TemplateContextType {
    selectedTemplate: TemplateState | null;
    selectTemplate: (template: TemplateState) => void;
    clearTemplate: () => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateState | null>(null);

    const selectTemplate = (template: TemplateState) => {
        setSelectedTemplate(template);
    };

    const clearTemplate = () => {
        setSelectedTemplate(null);
    };

    return (
        <TemplateContext.Provider value={{ selectedTemplate, selectTemplate, clearTemplate }}>
            {children}
        </TemplateContext.Provider>
    );
};

export const useTemplate = () => {
    const context = useContext(TemplateContext);
    if (!context) {
        throw new Error('useTemplate must be used within a TemplateProvider');
    }
    return context;
};