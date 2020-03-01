import React from 'react';
import './AutoComplete.css';

export default class AutoComplete extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userInput: '',
            filteredSuggestions: [],
            isClicked: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async handleChange(e){
        const val = e.currentTarget.value;
        if(this.props.requestServer){
            const response = await fetch(`${this.props.requestServer}`);
            const res = await response.json();
            const filteredSuggestions =  res.filter(el => el.includes(val));
            this.setState({
                userInput: val,
                filteredSuggestions: filteredSuggestions,
                isClicked: false
            })
        }else{
            const filteredSuggestions = this.props.suggestions.filter(el => el.includes(val));
            this.setState({
                userInput: val,
                filteredSuggestions: filteredSuggestions,
                isClicked: false
            })
        }
        
    }

    //处理点击列表
    async handleClick(e){
        const val = e.currentTarget.innerText;
        if(this.props.requestServer){
            const response = await fetch(`${this.props.requestServer}`);
            const res = await response.json();
            const filteredSuggestions =  res.filter(el => el.includes(val));
            this.setState({
                userInput: val,
                filteredSuggestions: filteredSuggestions,
                isClicked: true
            })
        }else{
            const filteredSuggestions = this.props.suggestions.filter(el => el.includes(val));
            this.setState({
                userInput: val,
                filteredSuggestions: filteredSuggestions,
                isClicked: true
            })
        }
    }

    render(){
        const filtered = this.state.filteredSuggestions;
        const userInput = this.state.userInput;
        const isClicked = this.state.isClicked;

        let className = '';

        let suggestionComponent;
        if(userInput){
            //有输入且过滤结果大于0则转换为列表后显示
            if(filtered.length > 0 && (!isClicked)){
                //在有列表显示时将input底部border-radius置0
                className = 'continuous-box';

                suggestionComponent = (
                    <ul>
                        {
                            filtered.map(val =>{
                                return (
                                    <li 
                                        key={val}
                                        onClick={ this.handleClick }>
                                        { val }
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }else if(isClicked){
                suggestionComponent = null;
            }else{
                suggestionComponent = (
                    <div>没有找到!</div>
                )
            }
        }else{
            suggestionComponent = null;
        }
        return (
            <div>
            <input 
                className={ className }
                onChange={ this.handleChange }
                value={this.state.userInput}
                onFocus={(e)=>e.preventDefault()}
                ></input>
            { suggestionComponent }
            </div>
        )
    }
}