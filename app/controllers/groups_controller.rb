class GroupsController < ApplicationController
    def index
    end
    def new
        @group = group.new
        @group.users << current_user
    end
    def create
        if @group.save
            rediet_to root_path, notice: 'グループを作成しました'
        else
            render :new
        end
    end
    def update
        if @group.update(group_params)
          redirect_to group_messages_path(@group), notice: 'グループを編集しました'
        else
          render :edit
        end
    end
    private
    def group_params
        params.require(:group).permit(:name, { :user_ids => []})
    end    

    def set_group
        @group = Group.find(params[:id])
      end
end
